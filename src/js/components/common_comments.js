import React from 'react';
import {Row, Col} from 'antd';
import { Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal, Card, notification } from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router';

class CommonComments extends React.Component{
  constructor(){
    super();
    this.state = {
      comments: ""
    }
  }

  componentDidMount(){
    var myFetchOptions = {
      method: "GET"
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({comments: json});
		});
  }

  handleSubmit(e){
    e.preventDefault();
    var myFetchOptions = {
      method: "GET"
    };
    var formdata = this.props.form.getFieldsValue();
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
			this.componentDidMount();
		});
  }

  addUserCollection(){
    var myFetchOptions = {
      method: "GET"
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      //notification
      notification['success']({message: 'React Notification', description: 'Bookmark Successful'});
    })
  }

  render(){
    let {getFieldProps} = this.props.form;
    const {comments} = this.state;
    const commentList = comments.length
    ?
    comments.map((comment, index)=>(
      <Card key={index} title={comment.UserName} extra={<a href="#">Posted at {comment.datetime}</a>}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    :
    "Nothing Found";

    return(
      <div class="comment">
        <Row>
          <Col span={24}>
            {commentList}
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem label="Your Comment">
                <Input type="textarea" placeholder="write something" {...getFieldProps('remark', {initialValue: ''})} />
              </FormItem>
              <Button type="primary" htmlType="submit">Submit your comment</Button>
              &nbsp;&nbsp;
              <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>Bookmark this post</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CommonComments = Form.create({})(CommonComments);
