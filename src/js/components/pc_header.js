import React from 'react';
import {Row, Col} from 'antd';
import { Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal } from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router';

class PCHeader extends React.Component{
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

  componentWillMount(){
    if(localStorage.userid != ""){
      this.setState({hasLoggedIn: true});
      this.setState({userNickName: localStorage.userNickName, userid: localStorage.userId});
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
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password
    		+ "&r_userName=" + formData.r_userName + "&r_password="
    		+ formData.r_password + "&r_confirmPassword="
    		+ formData.r_confirmPassword, myFetchOptions)
    		.then(response => response.json())
    		.then(json => {
    			this.setState({userNickName: json.NickUserName, userid: json.UserId});
          localStorage.userid = json.UserId;
          localStorage.userNickName = json.NickUserName;
    		});
        if(this.state.action=="login"){
          this.setState({hasLoggedIn: true});
        }
    		message.success("Register Complete!");
    		this.setModalVisible(false);
  }

  callback(key){
    if(key==1){
      this.setState({action: 'login'});
    }
    else if(key==2){
      this.setState({action: 'register'});
    }
  }

  logout(){
    localStorage.userid = '';
    localStorage.userNickName = '';
    this.setState({hasLoggedIn: false});
  }

  render(){
    let{getFieldProps} = this.props.form;
    const userShow = this.state.hasLoggedIn
    ?
    <Menu.Item key="logout" class="register">
      <Link to={`/usercenter`}>
        <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
      </Link>
      <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>Logout</Button>
    </Menu.Item>
    :
    <Menu.Item key="register" class="register">
      <Icon type="appstore"/>Login/Register
    </Menu.Item>;
    return(
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="" class="logo">
              <img src="src/images/logo.png"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
              <Menu.Item key="hot">
                <Icon type="star"/>What's Hot
              </Menu.Item>
              <Menu.Item key="international">
                <Icon type="global"/>International
              </Menu.Item>
              <Menu.Item key="tech">
                <Icon type="share-alt"/>Tech
              </Menu.Item>
              <Menu.Item key="weather">
                <Icon type="cloud-o"/>Weather
              </Menu.Item>
              {userShow}
            </Menu>
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
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  }
}

export default PCHeader = Form.create({})(PCHeader);
