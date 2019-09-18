// react自带组件
import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

// ant框架组件
import { Layout } from 'antd'

//自己的组件
import LeftNav from '../../components/leftNav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Order from '../order/order'

const { Footer, Sider, Content } = Layout
export default class Admin extends Component {
    render() {
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header style={{backgroundColor:"#F0F2F5"}}>
                        Header
                    </Header>

                    <Content style={{margin:20,backgroundColor:'#fff'}}>
                        <Switch>
                            <Redirect from='/' exact to='/home'/>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Route path="/charts/line" component={Line}/>
                            <Route path="/order" component={Order}/>
                        </Switch>
                    </Content>

                    <Footer style={{textAlign:'center',color:'#cccc'}}>
                        推荐使用谷歌浏览器，可以获得更佳页面操作体验
                    </Footer>

                </Layout>
            </Layout>
        )
    }
}