import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class PCNewsImageBlock extends React.Component{
  constructor(){
    super();
    this.state = {
      news: ''
    }
  }

  componentWillMount(){
    var myFetchOptions = {
      method: 'GET'
    }
    fetch("https://newsapi.org/v1/articles?source=" + this.props.source + "&sortBy=top&apiKey=870c2adca8e9465a95d4cefad6e778cd", myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({news: json}));
  }

  render(){
    const styleImage = {
      display: "block",
      width: this.props.imageWidth,
    };
    const styleH3 = {
      width: this.props.imageWidth,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    };
    const {news} = this.state;
    const newsList = news
    ?
    news.articles.map((newsItem, index)=>(
      <div key={index} class="imageblock">
        <a href={newsItem.url} target="_blank">
          <div class="custom-image">
            <img alt="" style={styleImage} src={newsItem.urlToImage} />
          </div>
          <div class="custom-card">
            <h3 style={styleH3}>{newsItem.title}</h3>
            <p>{newsItem.author}</p>
          </div>
        </a>
      </div>
    ))
    :
    'Nothing Found';

    return(
      <div class="topNewsList">
        <Card title={this.props.cardTitle} bordered={true} style={{width: this.props.width}}>
          {newsList}
        </Card>
      </div>
    )
  }
}
