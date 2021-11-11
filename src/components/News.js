
import React, { useState, useEffect } from 'react'

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
  
const [articles, setArticles] = useState([])
const [loading, setLoading] = useState(true)
const [page, setPage] = useState(1)
const [totaltResults, setTotaltResults] = useState(0)
  

  
  const updateNews=async()=> {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(40)
 
    let parsedData = await data.json();
    props.setProgress(70)

    console.log(parsedData);
    setArticles(parsedData.articles)
    setLoading(false)
    setTotaltResults(parsedData.totalResults)
   
    props.setProgress(100);
  }

  const capitaliseFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  useEffect(() => {
    document.title=`${capitaliseFirstLetter(props.category)} - NewsMonkey`
    updateNews();
    // eslint-disable-next-line 
  }, [])
  
  // const handleNextClick = async () => {    
  //   console.log("clicked");
  //   setPage(page +1)    
  //   updateNews();
  // };
  // const handlePreviousClick = async () => {
  //   setPage(page - 1)    
  //   updateNews();
  // };
  const fetchMoreData = async() => {    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)    
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotaltResults(parsedData.totalResults)
    };
  
    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 0px", marginTop:'90px' }}>
          NewsMonkey - Top Headings
        </h1>
        {loading && <Spinner/>} 
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totaltResults}
          loader={<Spinner/>}>

        <div  className="conatiner my-3 mx-3">
        <div className="row ">
          {articles.map((element) => {
            return (
              <div className="col-md-4 " key={element.url}>
                <NewsItem
                  title={
                    element.title === null ? "" : element.title.slice(0, 40)
                  }
                  description={
                    element.description === null
                      ? ""
                      : element.description.slice(0, 88)
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author === null ? "Unknown" : element.author}
                  time={element.publishedAt}
                  outlate={element.source.name}
                />
              </div>
            );
          })}
        </div> 
               </div>
        </InfiniteScroll>
       
    </>
    );
  
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
