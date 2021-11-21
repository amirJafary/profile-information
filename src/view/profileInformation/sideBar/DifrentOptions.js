import React, { Component } from 'react'

export default class DifrentOptions extends Component {
    render() {
        return (
            <div className='card p-3 mt-2'>
                <div className='pb-1'><a href='#1'>Profile Information</a></div>
                <div className='pb-1'><a href='#1'>Notification Setting</a></div>
                <div className='pb-1'><a href='#1'>Auto Delivery Setting</a></div>
                <div className='pb-1'><a href='#1'>Address</a></div>
                <div className='pb-1'><a href='#1'>Sign Out</a></div>
            </div>
        )
    }
}
