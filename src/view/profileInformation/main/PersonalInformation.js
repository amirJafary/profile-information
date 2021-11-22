import React, { Component } from 'react'
import MUSelect from '../../../component/select/MUSelect'
import MUTextField from '../../../component/textField/MUTextField'

import '../../../asset/scss/profileInformation.scss'

export default class PersonalInformation extends Component {
    render() {
        return (
            <div>
                <div className='card-body'>
                    <div className='fw-bold mb-2'>Personal Information</div>
                    <span className='d-flex Account-Type flex-column font-size-12 text-align-center'><span>Mobile</span><span className='fw-bold font-size-14'>+98 936 4500972</span></span>
                    <div className='d-flex'>
                        <MUSelect id='GenderType' deafultValue='No one' label='Gender Type *' firstValue='No one' secondValue='Male' thirdValue='Female'/>
                        <MUTextField id='FirstName' labalName='First Name *' type='text'/>
                        <MUTextField id='LastName' labalName='Last Name *' type='text'/>
                        <MUTextField id='IdNumber' labalName='Id Number' type='text'/>
                    </div>
                    <div className='d-flex'>
                        <div className='col-3'><MUTextField id='BirthDate' type='date'/></div>
                        <div className='col-6'><MUTextField id='Email' labalName='Email' type='email'/></div>
                    </div>
                    <div className='d-flex'>
                        <MUSelect id='State' deafultValue='Tehran' label='State *' firstValue='Tehran' secondValue='Shiraz' thirdValue='Kish'/>
                        <MUSelect id='City' deafultValue='Tehran' label='City *' firstValue='Tehran' secondValue='Shiraz' thirdValue='Kish'/>
                    </div>
                </div>
            </div>
        )
    }
}
