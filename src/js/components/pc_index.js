import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCList from './pc_list';

export default class PCIndex extends React.Component{
  render(){
    return(
      <div id="pc">
        <PCHeader></PCHeader>
        <PCList></PCList>
        <PCFooter></PCFooter>
      </div>
    );
  }
}
