import React, { Component } from 'react'

import '../../asset/scss/muDialog.scss'

export default class UploadFileIsFalse extends Component {
    render() {
        return (
            <>
                <div className='upload h-100'>
                    <input class='input-upload w-100'
                        type='file'
                        multiple accept='.jpeg,.jpg,.pdf'
                        onChange={this.props.openImajeClicked} />
                    <div className={`d-flex ${this.props.uploadedFiles.length >= 1 && 'flex-column'} h-100 align-items-center justify-content-evenly`}>
                        <div className='d-flex flex-column text-center'>
                            <i className='ns-icon-drag-drop fs-5rem'></i>
                            <span className='fw-bold'>Drag Here</span>
                        </div>
                        <div className='fw-bold'>
                            OR
                        </div>
                        <div className='d-flex flex-column text-center'>
                            <i className='ns-icon-pdf-thumbnail fs-5rem'></i>
                            <span className='fw-bold'>Browse Your File</span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
