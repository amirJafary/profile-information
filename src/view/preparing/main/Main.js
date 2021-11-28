import React, { Component } from 'react'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../../../asset/scss/preparing.scss'
import { PostPreparing } from '../../../services/PostPreparing'
import { PostFailed } from '../../../services/PostFailed'
import MUSelect from '../../../component/select/MUSelect';
import MUTabs from '../../../component/tabs/MUTabs';
import AGGrid from '../../../component/agGrid/AGGrid';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderInformations: [],
            pageLengths: [{ name: 10, id: 10 }, { name: 20, id: 20 }],
            deafultPageLengthsId: 10,
            pageLength: 10,
            total: null,
            allPaginationNumber: 1,
            deafultPageNumber: 1,
            valueOfTab: 1,
            totalFailed: null,
            orderInformationsFailed: [],
            allPaginationNumberFailed: 1,
        }
    }

    componentDidMount() {
        PostPreparing(this.PostPreparingCallback, this.state.pageLength, this.state.deafultPageNumber);
        PostFailed(this.PostFailedCallback, this.state.pageLength, this.state.deafultPageNumber);
    }

    inputSelectPageLengthChanged = (value) => {
        this.setState({
            pageLength: value
        }, () => PostPreparing(this.PostPreparingCallback, this.state.pageLength, this.state.deafultPageNumber))
    }

    PostPreparingCallback = (res) => {
        let temp = res.dataItems;
        let total = res.totalCount
        temp.map(item => item.turnaround === 1 ? item.turnaroundText = 'normal' : item.turnaroundText = 'express');
        temp.map(item => item.twoSidePrintingType === 2 ? item.twoSidePrintingText = "front and back" : item.twoSidePrintingText = "front only");
        let numberOfRows = this.state.pageLength
        // console.log(res);
        this.setState({
            total: total,
            orderInformations: temp,
            allPaginationNumber: Math.ceil(total / numberOfRows),
        }, () => console.info(this.state.allPaginationNumber))
    }

    PostFailedCallback = (res) => {
        let temp = res.dataItems;
        let total = res.totalCount
        temp.map(item => item?.turnaround === 1 ? item.turnaroundText = 'normal' : item.turnaroundText = 'express');
        temp.map(item => item?.twoSidePrintingType === 2 ? item.twoSidePrintingText = "front and back" : item.twoSidePrintingText = "front only");
        let numberOfRows = this.state.pageLength
        // console.log(res);
        this.setState({
            totalFailed: total,
            orderInformations: [],
            allPaginationNumberFailed: Math.ceil(total / numberOfRows),
        }, () => {
            this.setState({
                orderInformations: temp,
            })
            console.info(this.state.allPaginationNumber)
        })
    }

    expandLeftClicked = () => {
        if (this.state.deafultPageNumber >= 2) {
            this.setState({
                deafultPageNumber: this.state.deafultPageNumber - 1
            }, () => PostPreparing(this.PostPreparingCallback, this.state.pageLength, this.state.deafultPageNumber))
        }
    }

    expandRightClicked = () => {
        if (this.state.deafultPageNumber < this.state.allPaginationNumber) {
            this.setState({
                deafultPageNumber: this.state.deafultPageNumber + 1
            }, () => PostPreparing(this.PostPreparingCallback, this.state.pageLength, this.state.deafultPageNumber))
        }
    }

    GetValueOfTabs = (firstValueOfTab) => {
        this.setState({
            valueOfTab: firstValueOfTab
        }, () => {
            this.state.valueOfTab === 2
                ? PostFailed(this.PostFailedCallback, this.state.pageLength, this.state.deafultPageNumber)
                : PostPreparing(this.PostPreparingCallback, this.state.pageLength, this.state.deafultPageNumber)
        })
    }

    render() {
        console.log();
        return (
            <div className='ms-3 card w-75'>
                <div className='bg-ccc card-header'>
                    <i className='align-middle h2 pe-2 ns-icon-preparing-order'></i>
                    <span className='fw-bold font-size-18 '>Preparing</span>
                </div>
                <div>
                    
                </div>
                <div className='card-body px-3 pt-2 pb-5 '>
                    <div>
                        <MUTabs valueOfTab={this.state.valueOfTab} GetValueOfTabs={this.GetValueOfTabs} />
                        <AGGrid valueOfTab={this.state.valueOfTab} orderInformations={this.state.orderInformations} />
                    </div>
                    <div className="d-flex flex-md-row bg-ccc justify-content-end element-under-grid p-2">
                        <div className="d-flex flex-md-row">
                            <div className='d-flex align-items-center'>
                                <span className="MuiTypography-root me-3 text-color">
                                    Rows per page:
                                </span>
                                <span className='me-3'>
                                    <MUSelect id='pageLengths'
                                        inputSelectChanged={(value) => this.inputSelectPageLengthChanged(value)}
                                        deafultValue={this.state.deafultPageLengthsId}
                                        values={this.state.pageLengths} />
                                </span>
                                <div className='align-items-center d-flex'>
                                    <span>
                                        <button onClick={this.expandLeftClicked} className='btn-icon-detail width-hright-25'><i className='ns-icon-expand-left'></i></button>
                                    </span>
                                    Page {this.state.deafultPageNumber} of {this.state.allPaginationNumber}
                                    <span>
                                        <button onClick={this.expandRightClicked} className='btn-icon-detail width-hright-25'><i className='ns-icon-expand-right'></i></button>
                                    </span>
                                </div>
                                <span className='ms-3'>
                                    Total: {this.state.total}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}