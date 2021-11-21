import React, { Component } from 'react'

export default class PersonalInformation extends Component {
    render() {
        return (
            <div>
                <div className='card-body'>
                    <div className='fw-bold mb-2'>Personal Information</div>
                    <span className='d-flex Account-Type flex-column font-size-12 text-align-center'><span>Mobile</span><span className='fw-bold font-size-14'>+98 936 4500972</span></span>
                </div>
            </div>
        )
    }
}
