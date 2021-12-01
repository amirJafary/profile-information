import React, { Component } from 'react'

import '../../../asset/scss/fontIcons/NsFonts.scss'

export default class Orders extends Component {
    render() {
        return (
            <div className='card p-3 mt-2'>
                <div className='ps-1 pb-1'><i className='ns-icon-my-orders align-middle me-2 h2'></i><a href='#1'>My Orders</a></div>
                <div className='ps-3 pb-1'><i className='ns-icon-cart align-middle me-2 h2'></i><a href='#1'>Cart</a></div>
                <div className='ps-3 pb-1'><i className='ns-icon-preparing-order align-middle me-2 h2'></i><a href='/preparing'>Preparing</a></div>
                <div className='ps-3 pb-1'><i className='ns-icon-inproccess-order align-middle me-2 h2'></i><a href='#1'>In Process</a></div>
                <div className='ps-3 pb-1'><i className='ns-icon-ready-order align-middle me-2 h2'></i><a href='#1'>Ready To Deliver</a></div>
                <div className='ps-3 pb-1'><i className='ns-icon-archived-order align-middle me-2 h2'></i><a href='#1'>Archive</a></div>
                <div className='ps-3 pb-1'><i className='ns-icon-find-orders align-middle me-2 h2'></i><a href='#1'>Find Orders</a></div>
                <div className='ps-1 pb-1'><i className='ns-icon-delivery-request align-middle me-2 h2'></i><a href='#1'>Delivery Request</a></div>
                <div className='ps-1 pb-1'><i className='ns-icon-financial-report align-middle me-2 h2'></i><a href='#1'>Report</a></div>
                <div className='ps-3 pb-1'><i className='ns-icon-cart align-middle me-2 h2'></i><a href='#1'>Payment</a></div>
                <div className='ps-3 pb-1'><i className='ns-icon-cart align-middle me-2 h2'></i><a href='#1'>Financial</a></div>
            </div>
        )
    }
}
