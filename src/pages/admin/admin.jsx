// react自带组件
import React, { Component } from 'react'

// ant框架组件
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout

//自己的组件

export default class Admin extends Component {
    render() {
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>Sider</Sider>
                <Layout>
                    <Header style={{backgroundColor:"#F0F2F5"}}>
                        Header
                    </Header>

                    <Content style={{margin:20,backgroundColor:'#fff'}}>
                        Content
                    </Content>

                    <Footer style={{textAlign:'center',color:'#cccc'}}>
                        推荐使用谷歌浏览器，可以获得更佳页面操作体验
                    </Footer>

                </Layout>
            </Layout>
        )
    }
}