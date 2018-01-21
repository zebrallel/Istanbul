/**
 * @fileOverView: header
 * @author: xuejian.xu
 * @date: 2017/10/21.
 */

import './style.scss'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from 'pages/Home/action'
import Cookies from 'js-cookie'
import { notification } from 'antd'
import _get from 'lodash/get'

@withRouter
@connect(
    state => {
        const { Home: { loginStatus, cwpCustomers } } = state

        return { loginStatus, cwpCustomers }
    },
    dispatch => bindActionCreators(actions, dispatch)
)
export default class Header extends Component {
    onQuitHandler = () => {
        Cookies.remove('TOKEN')

        this.props.updateLogin(false, '', '')

        notification.success({
            message: '退出成功！'
        })

        this.props.history.push('/')
    }

    render() {
        const { loginStatus, cwpCustomers } = this.props
        const loginBtnContent = loginStatus ? (
            <a onClick={this.onQuitHandler} href="javascript:void(0)">
                退出
            </a>
        ) : (
            <Link to="/">登录</Link>
        )
        const name = cwpCustomers.customerRealName || cwpCustomers.customerName

        return (
            <div id="Header">
                <div className="content">
                    <div className="right">
                        {name && <span>欢迎: {name}</span>}
                        {loginBtnContent}
                    </div>
                </div>
            </div>
        )
    }
}
