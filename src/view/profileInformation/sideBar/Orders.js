import React, { Component } from 'react'

export default class Orders extends Component {
    render() {
        return (
            <div className='card p-3 mt-2'>
                <div className='ps-1 pb-1'><a href='#1'>My Orders</a></div>
                <div className='ps-3 pb-1'><a href='#1'>Cart</a></div>
                <div className='ps-3 pb-1'><a href='#1'>Preparing</a></div>
                <div className='ps-3 pb-1'><a href='#1'>In Process</a></div>
                <div className='ps-3 pb-1'><a href='#1'>Ready To Deliver</a></div>
                <div className='ps-3 pb-1'><a href='#1'>Archive</a></div>
                <div className='ps-3 pb-1'><a href='#1'>Find Orders</a></div>
                <div className='ps-3 pb-1'><a href='#1'>Delivery Request</a></div>
                <div className='ps-1 pb-1'><a href='#1'>Report</a></div>
                <div className='ps-3 pb-1'><a href='#1'>Payment</a></div>
                <div className='ps-3 pb-1'><a href='#1'>Financial</a></div>
            </div>
        )
    }
}
