import React, { Component } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../../../asset/scss/preparing.scss'

export default class Main extends Component {
    render() {
        const rowData = [
            { Status: "Toyota", 'Submit Date': "Celica", 'Product Name': 35000, 'Printed Side': 10, 'Turnaround': 20 , 'Total Quantity':100},
            { Status: "Ford", 'Submit Date': "Mondeo", 'Product Name': 32000, 'Printed Side': 10, 'Turnaround': 20 , 'Total Quantity':100},
            { Status: "Porsche", 'Submit Date': "Boxter", 'Product Name': 72000, 'Printed Side': 10, 'Turnaround': 20 , 'Total Quantity':100}
        ];


        const gridOptions = {
            defaultColDef: {
                flex: 1,
                wrapText: true,
                autoHeight: true,
                resizable: true,
            },
        }
        const cellRender = () => {
            return (
                <button className='btn-icon-detail'><i className='ns-icon-invoice-details'/></button>
            )
        }
        return (
            <div className='ms-3 w-75'>
                <div className='ag-theme-alpine w-100 h-25'>
                    <AgGridReact
                        gridOptions={Object.assign(gridOptions)}
                        suppressCount='true'
                        onColumnResized='true'
                        onColumnVisible='true'
                        reactUi="true"
                        sortable='true'
                        resizable='true'
                        columnDefs={this.props.columnDefs}
                        suppressRowClickSelection='true'
                        enableRangeSelection="true"
                        rowSelection="multiple"
                        groupSelectsChildren="true"
                        rowData={rowData}>
                        <AgGridColumn field="Action" cellRendererFramework={cellRender}></AgGridColumn>
                        <AgGridColumn field="Status"></AgGridColumn>
                        <AgGridColumn field="Submit Date"></AgGridColumn>
                        <AgGridColumn field="Product Name"></AgGridColumn>
                        <AgGridColumn field="Printed Side"></AgGridColumn>
                        <AgGridColumn field="Turnaround"></AgGridColumn>
                        <AgGridColumn field="Total Quantity"></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        )
    }
}
