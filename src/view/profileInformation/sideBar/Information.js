import React, { Component } from 'react'
import avatar from '../../../asset/image/avatar.png'
import AutorenewIcon from '@mui/icons-material/Autorenew';
export default class Informatin extends Component {
    render() {
        return (
            <div className='card p-2 pb-4'>
                <div className='d-flex'>
                    <img className='w-25' src={avatar} alt='avatar'/>
                    <div className='ms-4'>
                        <div className='font-size-12 fw-bold'>mohandes jafari</div>
                        <small>+98 936 4500972</small>
                    </div>
                </div>
                <div className='d-flex mb-3 padding-start-30'>
                    <div className='border-left'></div>
                    <div>
                        <div><button className='btn-icon'><i className='ns-icon-refresh'></i></button></div>
                        <div><button className='btn-icon'><i className='ns-icon-refresh'></i></button></div>
                    </div>
                    <div>
                        <div><small className='font-size-12'>Remaining Limit:<strong className='font-size-12 ms-2'>1,369.45 AED</strong></small></div>
                        <div><small className='font-size-12'>Account Balance:<strong className='font-size-12 ms-2'>1,369.45 AED creditor</strong></small></div>
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
