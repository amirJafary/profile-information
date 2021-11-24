import React, { Component } from 'react'
import PersonalInformation from './PersonalInformation'
import MUTextField from '../../../component/textField/MUTextField'

import '../../../asset/scss/profileInformation.scss'

export default class AccountSetting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCompany: false,
            firstName:'',
            lastName:'',
        }
    }

    render() {
        return (
            <div className='card'>
                <div className='card-header fw-bold'>Profile Information</div>
                <div className='card-body'>
                    <div className='fw-bold mb-2'>Account Setting</div>
                    <span className='d-flex Account-Type flex-column font-size-12 text-align-center'><span>Account Type</span><span className='fw-bold font-size-14'>Personal</span></span>
                </div>
                <div className='d-flex ps-2'>
                    {!!this.state.isCompany !== false ?
                        <>
                            <MUTextField id='CompanyName' labalName='Company Name *' type='text' />
                            <MUTextField id='License' labalName='License *' type='text' />
                            <MUTextField id='TRN' labalName='TRN' type='text' />
                        </>
                        : null
                    }
                </div>
                <PersonalInformation/>
            </div>
        )
    }
}
