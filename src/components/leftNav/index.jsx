import React,{ Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
//自己的组件
import './index.css'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

//antd框架插件
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;


class LeftNav extends Component {

    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if(!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuList)
        console.log(this.menuNodes)
    }
    render() {
        //得到当前请求的路由路径
        let path = this.props.location.pathname
        if(path.indexOf('./product')==0) {
            path = '/product'
        }

        //需要打开菜单项的key
        const openKey = this.openKey

        return (
            <div className="left-nav">
                <header className="left-nav-header">
                    <img src={logo} alt="Logo"/>
                    <h1>测试后台</h1>
                </header>

                <Menu 
                    theme="dark" 
                    mode="inline" 
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)