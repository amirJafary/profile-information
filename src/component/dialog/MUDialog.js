import React, { Component } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import '../../asset/scss/muDialog.scss'
import { GetExists } from '../../services/GetExists'
import { PostUpload } from '../../services/PostUpload'
import { Col } from 'react-bootstrap';

export default class MUDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            openDialog: this.props.openDialog,
            existFileDialog: false,
            name: '',
            uploadedFiles: [],
            warningTextForUploadFile: [],
            hasError: false,
            filenameState: []
        }
    }

    handleClose = () => {
        this.setState({ open: false }, () => this.props.stateOpenChanged(this.state.open));
    };

    handleCloseDialog = () => {
        this.setState({ openDialog: false }, () => this.props.stateOpenDialogChanged(this.state.openDialog));
    };

    inputFileNameChanged = (e) => {
        console.log(e.target.value);
        this.setState({
            name: e.target.value
        })
    }

    openImajeClicked = e => {
        const { files } = e.target;
        if (files && files.length) {
            const filenameState = this.state.filenameState;
            // console.info(filename , '******---------------******')
            let uploadedFiles = this.state.uploadedFiles;
            uploadedFiles.push(files[0])

            filenameState.push(files[0].name)

            this.setState({ filenameState })

            // console.info(this.state.filenameState, '******---------------******')

            this.setState({ uploadedFiles })
            GetExists(this.GetExistsCallback, files[0].name)
            // console.log(files[0]);
        }
    }

    GetExistsCallback = (res) => {
        if (!!res.hasError) {
            let uploadedFiles = this.state.uploadedFiles;
            let lastUploaded = this.state.uploadedFiles[this.state.uploadedFiles.length - 1];
            lastUploaded["existName"] = res?.messageItems[0]?.messageText;
            lastUploaded["isExist"] = res?.hasError;
            uploadedFiles.pop();
            uploadedFiles.push(lastUploaded)
            this.setState({
                uploadedFiles
            })
        }else{
            let filterItems = this.state.uploadedFiles.filter(item=>item.isExist===undefined);
            console.info(filterItems,'//////////*****************/////////////',filterItems[filterItems.length-1]);
            PostUpload(this.PostUploadCallback,filterItems[filterItems.length-1],0)
        }
    }

    PostUploadCallback=(res)=>{
        console.info(res)
    }

    // GetExistsCallback = (res) => {
    //     if (res.hasError) {
    //         let uploadedFiles = [...this.state.uploadedFiles];
    //         uploadedFiles[0].existName = res?.messageItems[0]?.messageText;
    //         uploadedFiles[0].isExist = res?.hasError
    //         this.setState({ uploadedFiles })
    //     }

    // }

    replaceButtonClicked = () => {

    }

    render() {
        // console.log(this.state.uploadedFiles);
        return (
            <div>
                {!!this.props.ok === true ?
                    <Dialog open={this.state.open} onClose={this.handleClose}>
                        <div className='d-flex parent-title-dialog align-items-center pe-3 justify-content-space-between'>
                            <DialogTitle>{this.props.titleText}(<span className='url'>./root/</span>)</DialogTitle>
                            <i onClick={this.handleClose} className='ms-auto ns-icon-close icon-close-dialog'></i>
                        </div>
                        <DialogContent>
                            <TextField className='mt-5'
                                onChange={this.inputFileNameChanged}
                                autoFocus
                                defaultValue={this.props?.deafultName}
                                margin="dense"
                                id="name"
                                label='Folder name'
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button className='btn-red' onClick={() => this.props.createFileButtonClicked(this.state.name)}>{this.props.buttonText}</Button>
                            <Button className='btn-white' onClick={this.handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    :
                    <Dialog className='upload-dialog' open={this.state.openDialog} onClose={this.handleCloseDialog}>
                        <div className='d-flex parent-title-dialog align-items-center pe-3 justify-content-space-between'>
                            <DialogTitle>{this.props.titleText}(<span className='url'>./root/</span>)</DialogTitle>
                            <i onClick={this.handleCloseDialog} className='ms-auto ns-icon-close icon-close-dialog'></i>
                        </div>
                        <DialogContent>
                            <div className='d-flex h-100'>
                                <Col className='h-100' xs={this.state.uploadedFiles?.length >= 1 ? 4 : 12}>
                                    {this.state.uploadedFiles?.length >= 1 ?
                                        <div className='upload h-100'>
                                            <input class='input-upload w-100 h-100' type='file' multiple accept='.jpeg,.jpg,.pdf' onChange={this.openImajeClicked} />
                                            <div className='d-flex flex-column h-100 align-items-center justify-content-evenly'>
                                                <div className='d-flex flex-column text-center'>
                                                    <i className='ns-icon-drag-drop fs-3rem'></i>
                                                    <span className='fw-bold'>Drag Here</span>
                                                </div>
                                                <div className='fw-bold'>
                                                    OR
                                                </div>
                                                <div className='d-flex flex-column text-center'>
                                                    <i className='ns-icon-pdf-thumbnail fs-3rem'></i>
                                                    <span className='fw-bold'>Browse Your File</span>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className='upload h-100'>
                                            <input class='input-upload w-100' type='file' multiple accept='.jpeg,.jpg,.pdf' onChange={this.openImajeClicked} />
                                            <div className='d-flex h-100 align-items-center justify-content-evenly'>
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
                                    }
                                </Col>
                                {this.state.uploadedFiles?.length >= 1 ?
                                    <Col xs={8} className='d-flex flex-column overflow-auto'>
                                        {/* {console.log(this.state.uploadedFiles)} */}
                                        {this.state.uploadedFiles.map((item) => {
                                            // console.log(item.isExist);
                                            // console.log(item);
                                            if (!!item.isExist) {
                                                return (
                                                    <div className='ps-2 mb-2 w-100'>
                                                        <div className='rows-of-upload-file d-flex align-items-center flex-row'>
                                                            <div className='col-3 p-2'>
                                                                <div className='d-flex align-items-center'>
                                                                    <i className='ns-icon-jpg-file fs-2rem'></i>
                                                                    <span className='fs-12'>{item?.name}</span>
                                                                </div>
                                                            </div>
                                                            <div className='col-5 p-2'>
                                                                <div className='d-flex align-items-center'>
                                                                    <i className='ns-icon-exclemation fs-2rem'></i>
                                                                    <span className='text-orange'>Waiting</span>
                                                                </div>
                                                                <span className='fs-12 text-orange'>{item?.existName}</span>
                                                            </div>
                                                            <div className='col-4 text-end p-2'>
                                                                <div className='d-flex align-items-center'>
                                                                    <button onClick={this.replaceButtonClicked} className='btn-transparent me-1'>Replace</button>
                                                                    <button onClick={this.keepBothButtonClicked} className='btn-transparent me-1'>Keep Both</button>
                                                                    <button onClick={this.cancelButtonClicked} className='btn-transparent'>Cancel</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className='ps-2 mb-2 w-100'>
                                                        <div className='rows-of-upload-file d-flex align-items-center flex-row'>
                                                            <div className='col-3 p-2'>
                                                                <div className='d-flex align-items-center'>
                                                                    <i className='ns-icon-jpg-file fs-2rem'></i>
                                                                    <span className='fs-12'>{item?.name}</span>
                                                                </div>
                                                            </div>
                                                            <div className='col-5 p-2'>

                                                            </div>
                                                            <div className='col-4 text-end p-2'>
                                                                yeah men
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </Col>
                                    : <span></span>}
                            </div>
                        </DialogContent>
                    </Dialog>
                }
            </div>
        );
    }
}