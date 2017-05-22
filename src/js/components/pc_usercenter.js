import React from 'react';
import {Row, Col} from 'antd';
import { Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal, Card, Upload } from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router';

export default class PCUserCenter extends React.Component {
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

    const props = {
      action: 'http://newsapi.gugujiankong.com/handler.ashx',
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      listType: 'picture-card',
      defaultFileList: [
        {
          uid: -1,
          name: 'xxx.png',
          url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
          thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
        }
      ],
      onPreview: (file)=>{
        this.setState({
          previewImage: file.url,
          previewVisible: true
        })
      }
    }

    const {usercollection, usercomments} = this.state;
    const usercollectionList = usercollection.length
    ?
    usercollection.map((uc, index)=>(
      <Card key={index} title={uc.uniquekey}>
        <p>
          <Link to={`details/${uc.uniquekey}`} target="_blank">
          {uc.Title}
          </Link>
        </p>
      </Card>
    ))
    :
    "No Bookmark Found";

    const usercommentsList = usercomments.length
    ?
    usercomments.map((comment, index)=>(
      <Card key={index} title={`Your comment of ${comment.uniquekey} on ${comment.datetime}`}>
        <p>
          <Link to={`details/${comment.uniquekey}`} target="_blank">
          {comment.Comments}
          </Link>
        </p>
      </Card>
    ))
    :
    "No Comment Found";

    return(
      <div>
        <PCHeader/>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs>
              <TabPane tab="My Bookmarks" key="1">
                <div class="comment">
                  <Row>
                    <Col span={24}>
                      {usercollectionList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="My Comments" key="2">
                <div class="comment">
                  <Row>
                    <Col span={24}>
                      {usercommentsList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              {/*<TabPane tab="Portrait" key="3">
                <div class="clearfix">
                  <Upload {...props}>
                    <Icon type="plus"/>
                    <div className="ant-upload-text">Upload a photo</div>
                  </Upload>
                  <Modal visible = {this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="Preview" src={this.state.preview}/>
                  </Modal>
								</div>
              </TabPane>*/}
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter/>
      </div>
    )
  }
}
