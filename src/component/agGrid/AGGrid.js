import React, { Component } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

export default class AGGrid extends Component {


    onGridReady = (params) => {
        let rows = [...this.props.orderInformations];
        this.gridApi = params.api;
        this.gridColumnApi = params.api;
        rows.forEach(row => {
            switch (row.confirmdate) {
                case 1:
                    return 'not Applied';
                    
                case 2:
                    return 'In First Queue';
                    
                case 3:
                    return 'prepare';
                    
                case 4:
                    return 'In Progress';
                    
                case 5:
                    return 'layouting';
                    
                case 6:
                    return 'progress Fail';
                    
                default:
                    return null;
                    
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
            // console.info('this is e =>',e.value)
            return (
                <span onClick={this.props?.orderDetaileClicked(e)} className='btn-icon-detail'><a href={`/preparing/${e.value}`}><i className='ns-icon-invoice-details' /></a></span>
            )
        }

        return (
            <div className='ag-theme-alpine w-100'>
                <AgGridReact key={this.props.orderInformations?.length}
                    gridOptions={Object.assign(gridOptions)}
                    suppressCount='true'
                    onColumnResized='true'
                    onColumnVisible='true'
                    columnDefs={this.props.columnDefs}
                    suppressRowClickSelection='true'
                    enableRangeSelection="true"
                    rowSelection="multiple"
                    groupSelectsChildren="true"
                    rowData={this.props.orderInformations}
                    onGridReady={this.onGridReady}>
                    <AgGridColumn minWidth='80' headerName="Action" field="id" cellRendererFramework={(e,value)=>cellRender(e,value)} />
                    <AgGridColumn minWidth='100' headerName="Status" field="sharedSheetOrderStateType" />
                    <AgGridColumn minWidth='150' headerName="Submit Date" field="splitedTime" />
                    <AgGridColumn minWidth='250' headerName="Product Name" field="productName" />
                    <AgGridColumn minWidth='120' headerName="Printed Side" field="twoSidePrintingText" />
                    <AgGridColumn minWidth='100' headerName="Turnaround" field="turnaroundText" />
                    <AgGridColumn minWidth='100' headerName="Total Quantity" field="totalQuantity" />
                    <AgGridColumn minWidth='100' headerName="Total Price" field="totalPrice" />
                </AgGridReact>
            </div>
        )
    }
}
