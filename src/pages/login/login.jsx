//react自带组件
import React, { Component } from 'react'
// import {Redirect} from 'react-router-dom'

//导入第三方框架中的组件
import { Form, Icon, Input, Button, message } from 'antd'

//导入自己的组件
import './login.css'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api'

const Item = Form.Item  //不能写在import之前

class Login extends Component {

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('提交登录的ajax请求', values);
                //请求登录
                const {username,password} = values;
                //这是promise的写法
                // reqLogin(username,password).then(response => {
                //     console.log('成功了',response.data)
                // }).catch(error => {
                //     console.log('失败了',+error.message)
                // })
                
                // 将提示信息封装到函数中
                // try {
                //     const response = await reqLogin(username,password)
                //     console.log('请求成功',response.data)
                // } catch (error) {
                //     console.log('请求出错',error)
                // }

                // const result = await reqLogin(username,password)

                // console.log(result);

            } else {
                console.log('校验失败')
            }
        });

    }

    //密码的验证要求
    validatePwd = (rule,value,callback) => {
        if(!value) {
            callback('密码必须输入')
        } else if (value.length<4) {
            callback('密码长度不能小于4位')
        } else if (value.length>12) {
            callback('密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成')
        } else {
            callback() // 验证通过
        }
    }
    render() {
        
        const form = this.props.form
        const { getFieldDecorator } = form;

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h1>React项目，后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {
                                getFieldDecorator('username',{
                                    rules:[
                                        {required:true,whitespace:true,message:'用户名必须输入'},
                                        { min:4,message:'用户名至少4位'},
                                        { max:12,message:'用户名最多12位'},
                                        { pattern: /^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'}
                                    ],
                                    initialValue: 'admin', // 初始值
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator('password',{
                                    rules:[
                                        {validator:this.validatePwd}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        
                        </Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                               登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
const WrapLogin = Form.create()(Login)
export default WrapLogin