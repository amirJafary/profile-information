import React, { Component } from 'react'

import { GetOrderBasicInformation } from '../../../services/GetOrderBasicInformation'
import AGGridDetail from '../../../component/agGrid/AGGridDetail';
import '../../../asset/scss/orderDetail.scss'

class MainOrderDetail extends Component {

    constructor(props) {
        super(props);
        let href = window.location.href.split("/")
        let orderId= href.pop()

        this.state = {
            orderInformations: [],
            orderId:orderId,
            circulation:null,
            createDate:null,
            productName:'',
            turnaround:null,
            twoSidePrintingType:null,
            lat:null,
        }
    }

    componentDidMount() {
        GetOrderBasicInformation(this.GetOrderBasicInformationCallback,this.state.orderId)
    }

    GetOrderBasicInformationCallback = (res) => {
        let circulation = res.circulation;
        let createDate = res.createDate.split('T');
        let productName = res.productName;
        let turnaround = res.turnaround;
        let twoSidePrintingType = res.twoSidePrintingType;
        let lat = res.totalLatCount;
        this.setState({
            orderInformations:res,
            circulation:circulation,
            createDate:createDate[0],
            productName:productName,
            turnaround:turnaround,
            twoSidePrintingType:twoSidePrintingType,
            lat:lat,
        })
        console.info(res)
    }

    render() {
        return (
            <div className='ms-3 card w-75'>
                <div className='bg-ccc card-header'>
                    <a href='/preparing'><i className='align-middle h2 pe-2 ns-icon-back-thin'></i></a>
                    <span className='fw-bold font-size-18 '>Order Detail</span>
                </div>
                <div className='card-body px-3 mt-3 pt-2 pb-5'>
                    <div className='d-flex'>
                        <div className='box-informations py-2 px-3'>
                            <div className='box-informations-header'>Submit Date</div>
                            <div className='box-informations-body'>{this.state.createDate}</div>
                        </div>
                        <div className='box-informations py-2 px-3'>
                            <div className='box-informations-header'>Printed Side</div>
                            <div className='box-informations-body'>{this.state.twoSidePrintingType === 1 ?'front only' :'front and back'}</div>
                        </div>
                        <div className='box-informations py-2 px-3'>
                            <div className='box-informations-header'>Turnaround</div>
                            <div className='box-informations-body'>{this.state.turnaround === 1 ?'normal' :'express'}</div>
                        </div>
                        <div className='box-informations py-2 px-3'>
                            <div className='box-informations-header'>Circulation</div>
                            <div className='box-informations-body'>{this.state.circulation}</div>
                        </div>
                        <div className='box-informations py-2 px-3'>
                            <div className='box-informations-header'>Total Up's</div>
                            <div className='box-informations-body'>{this.state.lat}</div>
                        </div>
                    </div>
                    <div>
                        <AGGridDetail/>
                    </div>
                    <div className="d-flex flex-md-row bg-ccc justify-content-end element-under-grid p-2">
                        <div className="d-flex flex-md-row">
                            <div className='d-flex align-items-end'>
                                <span>
                                    Total: {/*this.state.total*/}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainOrderDetail
