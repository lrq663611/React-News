import React from 'react';
import {Row, Col} from 'antd';
import {Tabs, Carousel} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsBlockChinese from './pc_news_block_chinese';
import PCNewsHtml from './pc_news_html';
import PCNewsImageBlock from './pc_news_image_block';
const TabPane = Tabs.TabPane;

export default class PCList extends React.Component{
  render(){
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slideToShow: 1,
      autoplay: true
    }
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class="container">
            <div class="leftContainer">
              <h2 class="image-headline">Image Headline</h2>
              <div class="carousel">
                <Carousel {...settings}>
                  <div><img src="./src/images/carousel_1.jpg"/></div>
                  <div><img src="./src/images/carousel_2.jpg"/></div>
                  <div><img src="./src/images/carousel_3.jpg"/></div>
                  <div><img src="./src/images/carousel_4.jpg"/></div>
                </Carousel>
              </div>
              <PCNewsImageBlock source="espn" width="500px" cardTitle="ESPN" imageWidth="140px" />
            </div>
            <div class="middleContainer">
              <Tabs class="tabs_news">
                <TabPane tab="ABC News (AU)" key="1">
                  <PCNewsBlock source="abc-news-au" width="100%" bordered="false" />
                </TabPane>
                <TabPane tab="BBC News" key="2">
                  <PCNewsBlock source="bbc-news" width="100%" bordered="false" />
                </TabPane>
                <TabPane tab="CNN" key="3">
                  <PCNewsBlock source="cnn" width="100%" bordered="false" />
                </TabPane>
                <TabPane tab="Fortune" key="4">
                  <PCNewsBlock source="fortune" width="100%" bordered="false" />
                </TabPane>
                <TabPane tab="IGN" key="5">
                  <PCNewsBlock source="ign" width="100%" bordered="false" />
                </TabPane>
                <TabPane tab="Independent" key="6">
                  <PCNewsBlock source="independent" width="100%" bordered="false" />
                </TabPane>
              </Tabs>
              <Tabs class="tabs_news">
                <TabPane tab="Chinese" key="1">
                  <PCNewsBlockChinese count={22} type="top" width="100%" bordered="false" />
                </TabPane>
              </Tabs>
            </div>
            <div class="rightContainer">
              <Tabs class="tabs_html">
  							<TabPane tab="HTML From SMH" key="1">
  								<PCNewsHtml/>
  							</TabPane>
  						</Tabs>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}
