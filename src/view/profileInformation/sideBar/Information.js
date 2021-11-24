import React, { Component } from 'react'
import avatar from '../../../asset/image/avatar.png'

import {GetBalance} from '../../../services/GetBalance'
import {GetCredit} from '../../../services/GetCredit'
import { GetPersonalInformation } from '../../../services/GetPersonalInformation'
export default class Informatin extends Component {

    constructor(props) {
        super(props);
        this.state={
            balance:0,
            credit:0,
            firstName:'',
            lastName:''
        }
    }
    
    componentDidMount(){
        GetBalance(this.GetBalanceCallback);
        GetCredit(this.GetCreditCallback);
        GetPersonalInformation(this.getPersonalInformationCallback);
    }
    
    getPersonalInformationCallback = (res) => {

        let firstName = res.firstName;
        let lastName = res.lastName;

        this.setState({
            firstName: firstName,
            lastName: lastName,
        }, () => console.info(this.state))
    }

    GetBalanceCallback=(res)=>{
        this.setState({
            balance:res
        })
    }

    GetCreditCallback=(res)=>{
        this.setState({
            credit:res
        })
    }

    render() {
        return (
            <div className='card p-2 pb-4'>
                <div className='d-flex'>
                    <img className='w-25' src={avatar} alt='avatar'/>
                    <div className='ms-4'>
                        <div className='font-size-14 mt-2 fw-bold'>{this.state.firstName} {this.state.lastName}</div>
                        <small className='font-size-12'>+989121111111</small>
                    </div>
                </div>
                <div className='d-flex mb-3 padding-start-30'>
                    <div className='border-left'></div>
                    <div className='d-flex flex-column pt-1'>
                        <span className='btn-icon mb-1'><i className='ns-icon-refresh'></i></span>
                        <span className='btn-icon'><i className='ns-icon-refresh'></i></span>
                    </div>
                    <div>
                        <div><small className='font-size-12'>Remaining Limit:<strong className='font-size-12 ms-2'>{this.state.balance}.00 AED</strong></small></div>
                        <div><small className='font-size-12'>Account Balance:<strong className='font-size-12 ms-2'>{this.state.balance}.00 AED</strong></small></div>
                    </div>
                </div>
                <div className='d-flex flex-column align-items-center w-100 '>
                    <button className='btn col-6 mb-2'><span></span>Increase Credit</button>
                    <button className='btn col-6'><span></span>Change Password</button>
                </div>
            </div>
        )
    }
}
