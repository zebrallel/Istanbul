/**
 * @fileOverView:  我的首页
 * @author: xuejian.xu
 * @date: 2017/11/18.
 */

import './style.scss';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './action';

class MyHome extends Component{
  componentDidMount(){
    const {queryFundDetails, customerId, token} = this.props;

    if(customerId){
      queryFundDetails(customerId, token, 0);
    }
  }

  onNavButtonClick(isPrev){
    const {queryFundDetails, customerId, token, currentPageIndex, totalPages} = this.props;

    if(isPrev){
      if(currentPageIndex > 0){
        queryFundDetails(customerId, token, currentPageIndex - 1);
      }
    }else{
      if(currentPageIndex < totalPages - 1){
        queryFundDetails(customerId, token, currentPageIndex + 1);
      }
    }
  }

  render(){
    const {fundDetails, customerId, currentPageIndex, totalPages} = this.props;

    if(!customerId){
      return <div>请先登录！</div>
    }

    return (
      <div id="MyHome">
        <div className="top">
          <div className="flex-1">
            <div className="balance">
              <p>账户余额</p>
              <p className="red">123</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="coupon">
              <p>我的抵用券</p>
            </div>
          </div>
          <div className="flex-1">
            <button className="btn btn-charge">充值</button>
          </div>
          <div className="flex-1">
            <button className="btn btn-withdraw">提现</button>
          </div>
        </div>
        <div className="title">资金明细</div>
        <table className="table">
          <thead>
            <tr className="title">
              <td>资金明细ID</td>
              <td>客户ID</td>
              <td>流向</td>
              <td>变动金额</td>
              <td>剩余金额</td>
              <td>变动时间</td>
              <td>备注信息</td>
            </tr>
          </thead>
          <tbody>
          {fundDetails.map((item)=>{
            const flowWay = item.flowWay === 0 ? '支出' : '收入';

            return (
              <tr key={item.fundsDetailsId}>
                <td>{item.fundsDetailsId}</td>
                <td>{item.customerId}</td>
                <td>{flowWay}</td>
                <td>{item.amountChange}</td>
                <td>{item.amountResidual}</td>
                <td>{item.changeTime}</td>
                <td>{item.remark}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        <div className="table-nav">
          <button className="btn" onClick={this.onNavButtonClick.bind(this, true)}>上一页</button>
          当前第<span>{currentPageIndex + 1}</span>页，总共<span>{totalPages}</span>页
          <button className="btn" onClick={this.onNavButtonClick.bind(this, false)}>下一页</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { MyHome, Home } = state;

  return Object.assign({}, MyHome, Home);
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MyHome);