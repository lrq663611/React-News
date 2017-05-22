import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import {Row, Col, BackTop} from 'antd';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';

export default class PCNewsDetails extends React.Component{
  constructor(){
    super();
    this.state = {
      newsItem: ''
    }
  }

  componentDidMount(){
    var myFetchOptions = {
      method: "GET"
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({newsItem: json});
			document.title = this.state.newsItem.title + " - React News";
		});
  }

  createMarkup(){
    return{__html: this.state.newsItem.pagecontent};
  }

  render(){
    return(
      <div id="pc">
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14} class="container">
            <div class="articlecontainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <hr/>
            <CommonComments uniquekey={this.props.params.uniquekey}/>
          </Col>
          <Col span={6}>
            <PCNewsImageBlock count={40} type="top" width="100%" cardTitle="Related News" imageWidth="150px"/>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter></PCFooter>
        <BackTop/>
      </div>
    )
  }
}
