import React from 'react';
import {Row, Col} from 'antd';
import { Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal } from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router';

class MobileHeader extends React.Component{
  constructor(){
    super();
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLoggedIn: false,
      userNickName: '',
      userid: 0
    }
  }

  setModalVisible(value){
    this.setState({modalVisible: value})
  }

  handleClick(e){
    if(e.key == "register"){
      this.setState({current:'register'});
      this.setModalVisible(true);
    }
    else{
      this.setState({current:e.key})
    }
  }

  handleSubmit(e){
    //submit to API
    e.preventDefault();
    var myFetchOptions = {
      method: "GET"
    }
    var formData = this.props.form.getFieldsValue();
    console.log(this.props.form);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password
    		+"&r_userName=" + formData.r_userName + "&r_password="
    		+ formData.r_password + "&r_confirmPassword="
    		+ formData.r_confirmPassword, myFetchOptions)
    		.then(response => response.json())
    		.then(json => {
    			this.setState({userNickName: json.NickUserName, userid: json.UserId});
    		});
        if(this.state.action=="login"){
          this.setState({hasLoggedIn: true});
        }
        message.success("Register Complete!");
        this.setModalVisible(false);
  }

  login(){
    this.setModalVisible(true);
  }

  callback(key){
    if(key==1){
      this.setState({action: 'login'});
    }
    else if(key==2){
      this.setState({action: 'register'});
    }
  }

  render(){
    let{getFieldProps} = this.props.form;
    const userShow = this.state.hasLoggedIn ?
    <Link to={`usercenter`}>
      <Icon type="inbox" />
    </Link>
    :
    <Icon type="setting" onClick={this.login.bind(this)} />

    return(
      <header>
        <img src="src/images/logo.png"/>
        <span>ReactNews</span>
        {userShow}

        <Modal title="Account" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="Close">
          <Tabs type="card" onChange={this.callback.bind(this)}>
            <TabPane tab="Login" key="1">
              <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem lable="User Name">
                  <Input placeholder="Please fill in your user name" {...getFieldProps('userName')}/>
                </FormItem>
                <FormItem lable="Password">
                  <Input type="password" placeholder="Please fill in your password" {...getFieldProps('password')}/>
                </FormItem>
                <Button type="primary" htmlType="submit">Login</Button>
              </Form>
            </TabPane>
            <TabPane tab="Register" key="2">
              <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem lable="User Name">
                  <Input placeholder="Please fill in your user name" {...getFieldProps('r_userName')}/>
                </FormItem>
                <FormItem lable="Password">
                  <Input type="password" placeholder="Please fill in your password" {...getFieldProps('r_password')}/>
                </FormItem>
                <FormItem lable="Password Confirmation">
                  <Input type="password" placeholder="Please fill in your password again" {...getFieldProps('r_confirmPassword')}/>
                </FormItem>
                <Button type="primary" htmlType="submit">Register</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </header>
    );
  }
}

export default MobileHeader = Form.create({})(MobileHeader);
