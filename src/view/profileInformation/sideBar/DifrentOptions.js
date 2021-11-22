import React, { Component } from 'react'

import '../../../asset/scss/fontIcons/NsFonts.scss'

export default class DifrentOptions extends Component {
    render() {
        return (
            <div className='card p-3 mt-2'>
                <div className='pb-1'><i className='ns-icon-profile-information align-middle me-2 h2'></i><a href='#1'>Profile Information</a></div>
                <div className='pb-1'><i className='ns-icon-notification-setting align-middle me-2 h2'></i><a href='#1'>Notification Setting</a></div>
                <div className='pb-1'><i className='ns-icon-auto-delivery-setting align-middle me-2 h2'></i><a href='#1'>Auto Delivery Setting</a></div>
                <div className='pb-1'><i className='ns-icon-address align-middle me-2 h2'></i><a href='#1'>Address</a></div>
                <div className='pb-1'><i className='ns-icon-sign-out align-middle me-2 h2'></i><a href='#1'>Sign Out</a></div>
            </div>
        )
    }
}
