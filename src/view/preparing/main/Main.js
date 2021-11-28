import React, { Component } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../../../asset/scss/preparing.scss'
import { PostPreparing } from '../../../services/PostPreparing'
import MUSelect from '../../../component/select/MUSelect';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderInformations: [],
            pageLengths: [{ name: 10, id: 10 }, { name: 20, id: 20 }],
            deafultPageLengthsId: 10,
            pageLength: 10,
            total:null
        }
    }

    componentDidMount() {
        PostPreparing(this.PostPreparingCallback,this.state.pageLength)
    }

    inputSelectPageLengthChanged = (value) => {
        this.setState({
            pageLength: value
        },()=>PostPreparing(this.PostPreparingCallback,this.state.pageLength))
    }

    PostPreparingCallback = (res) => {
        let temp = res.dataItems;
        let total=res.totalCount
        temp.map(item => item.turnaround === 1 ? item.turnaroundText = 'normal' : item.turnaroundText='express');
        temp.map(item => item.twoSidePrintingType === 2 ? item.twoSidePrintingText = "front and back" : item.twoSidePrintingText ="front only");
        console.log(res);
        this.setState({
            total:total,
            orderInformations: temp
        })
    }

    onGridReady = (params) => {
        let rows = [...this.state.orderInformations];
        this.gridApi = params.api;
        this.gridColumnApi = params.api;
        rows.forEach(row => {
            switch (row.confirmdate) {
                case 1:
                    return 'not Applied';
                    break;
                case 2:
                    return 'In First Queue';
                    break;
                case 3:
                    return 'prepare';
                    break;
                case 4:
                    return 'In Progress';
                    break;
                case 5:
                    return 'layouting';
                    break;
                case 6:
                    return 'progress Fail';
                    break;
                default:
                    break;
            }
        })
    }

    render() {

        const gridOptions = {
            defaultColDef: {
                flex: 1,
                wrapText: true,
                autoHeight: true,
                resizable: true,
            },
        }

        const cellRender = (e) => {
            console.info('this is e =>',e.value)
            return (
                <span className='btn-icon-detail'><a href={`/preparing/${e.value}`}><i className='ns-icon-invoice-details' /></a></span>
            )
        }

        return (
            <div className='ms-3 card w-75'>
                <div className='bg-ccc card-header'>
                    <i className='align-middle h2 pe-2 ns-icon-preparing-order'></i>
                    <span className='fw-bold font-size-18 '>Preparing</span>
                </div>
                <div className='card-body px-3 pt-2 pb-5 '>
                    <div className='ag-theme-alpine w-100'>
                        <AgGridReact key={this.state.orderInformations?.length}
                            gridOptions={Object.assign(gridOptions)}
                            suppressCount='true'
                            onColumnResized='true'
                            onColumnVisible='true'
                            columnDefs={this.props.columnDefs}
                            suppressRowClickSelection='true'
                            enableRangeSelection="true"
                            rowSelection="multiple"
                            groupSelectsChildren="true"
                            rowData={this.state.orderInformations}
                            onGridReady={this.onGridReady}>
                            <AgGridColumn minWidth='80' headerName="Action" field="id" cellRendererFramework={(e,value)=>cellRender(e,value)} />
                            <AgGridColumn minWidth='100' headerName="Status" field="sharedSheetOrderStateType" />
                            <AgGridColumn minWidth='150' headerName="Submit Date" field="createDate" />
                            <AgGridColumn minWidth='250' headerName="Product Name" field="productName" />
                            <AgGridColumn minWidth='120' headerName="Printed Side" field="twoSidePrintingText" />
                            <AgGridColumn minWidth='100' headerName="Turnaround" field="turnaroundText" />
                            <AgGridColumn minWidth='100' headerName="Total Quantity" field="totalQuantity" />
                            <AgGridColumn minWidth='100' headerName="Total Price" field="totalPrice" />
                        </AgGridReact>
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
                                <span>
                                    Page 1 of 1
                                </span>
                                <span className='ms-3'>
                                    Total:{this.state.total}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}