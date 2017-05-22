import React from 'react';
import {Row, Col} from 'antd';
import { Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal, Card } from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router';

export default class MobileUserCenter extends React.Component {
  constructor(){
   super();
   this.state = {
     usercollection: '',
     usercomments: '',
     previewImage: '',
     previewVisible: false
   }
  }

  componentDidMount(){
    var myFetchOptions = {
      method: "GET"
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercollection:json});
    });

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercomments:json});
    });
  }

  render(){
    const {usercollection, usercomments} = this.state;
    const usercollectionList = usercollection.length
    ?
    usercollection.map((uc, index)=>(
      <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>View</a>}>
        <p>{uc.Title}</p>
      </Card>
    ))
    :
    "No Bookmark Found";

    const usercommentsList = usercomments.length
    ?
    usercomments.map((comment, index)=>(
      <Card key={index} title={`Your comment on ${comment.datetime}`} extra={<a href={`/#/details/${comment.uniquekey}`}>View</a>}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    :
    "No Comment Found";

    return(
      <div id="mobile">
        <MobileHeader/>
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="My Bookmarks" key="1">
                <Row>
                  <Col span={24}>
                    {usercollectionList}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="My Comments" key="2">
                <Row>
                  <Col span={24}>
                    {usercommentsList}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Portrait" key="3">

              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <MobileFooter/>
      </div>
    )
  }
}
