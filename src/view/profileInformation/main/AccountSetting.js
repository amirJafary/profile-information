import React, { Component } from 'react'
import MUTextField from '../../../component/textField/MUTextField'
import PersonalInformation from './PersonalInformation'

export default class AccountSetting extends Component {
    render() {
        return (
            <div className='card'>
                <div className='card-header fw-bold'>Profile Information</div>
                <div className='card-body'>
                    <div className='fw-bold mb-2'>Account Setting</div>
                    <span className='d-flex Account-Type flex-column font-size-12 text-align-center'><span>Account Type</span><span className='fw-bold font-size-14'>Bussiness</span></span>
                </div>
                <div className='d-flex ps-2'>
                    <MUTextField id='CompanyName' labalName='Company Name *' type='text'/>
                    <MUTextField id='License' labalName='License *' type='text'/>
                    <MUTextField id='TRN' labalName='TRN' type='text'/>
                </div>
                <PersonalInformation/>
            </div>
        )
    }
}
