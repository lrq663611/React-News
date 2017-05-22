import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Tabs} from 'antd';
import MobileList from './mobile_list';
const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component{
  render(){
    return(
      <div id="mobile">
        <MobileHeader></MobileHeader>
        <Tabs>
          <TabPane tab="What's Hot" key="1">
            <MobileList count={20} type="top"/>
          </TabPane>
          <TabPane tab="International" key="2">
            <MobileList count={20} type="guoji"/>
          </TabPane>
          <TabPane tab="Tech" key="3">
            <MobileList count={20} type="keji"/>
          </TabPane>
        </Tabs>
        <MobileFooter></MobileFooter>
      </div>
    );
  }
}
