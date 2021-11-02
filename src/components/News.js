import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  articles = [];
  
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category:'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    console.log("hello from news component");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${
      this.props.category
    }&apiKey=2a2cb08c8d234016985efa8f3de6b361&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${
    //   this.props.category
    // }&apiKey=2a2cb08c8d234016985efa8f3de6b361&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    console.log('didm')
    this.updateNews();
   
  }
  handleNextClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=2a2cb08c8d234016985efa8f3de6b361&page=${
    //   this.state.page + 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page + 1,
    //   loading: false,
    // });
    console.log("clicked");
    this.setState({
      page:this.state.page + 1
    })
    this.updateNews();
  };
  handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=2a2cb08c8d234016985efa8f3de6b361&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   loading: false,
    // });
    this.setState({
      page:this.state.page - 1
    })
    this.updateNews();
  };
  render() {
    return (
      <div className="container my-3 ">
        <h1 className="text-center" style={{margin: '40px 0px'}}>NewsMonkey - Top Headings</h1>
        {this.state.loading && <Spinner />}

        <div className="row ">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-3 md-4" key={element.url}>
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
                     author={element.author===null?'Unknown':element.author}
                     time={element.publishedAt}
                     outlate={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
            disabled={this.state.page <= 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
