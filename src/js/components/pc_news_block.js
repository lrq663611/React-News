import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class PCNewsBlock extends React.Component{
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
    const {news} = this.state;
    const newsList = news
    ?
    news.articles.map((newsItem, index)=>(
      <li key={index}>
        <a href={newsItem.url} target="_blank">
          {newsItem.title}
        </a>
      </li>
    ))
    :
    'Nothing Found';

    return(
      <div class="topNewsList">
        <Card>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    )
  }
}
