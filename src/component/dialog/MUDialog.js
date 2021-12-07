import React, { Component } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import '../../asset/scss/muDialog.scss'

export default class MUDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            openDialog: this.props.openDialog,
            name: ''
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
        //   const filename = files[0].name;
          console.log(files[0]);
        }
    }

    render() {
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
                            <div className='upload'>
                                <input class='input-upload' type='file' multiple accept='.jpeg,.jpg,.pdf' onChange={this.openImajeClicked} />
                                <div className='d-flex h-100 align-items-center justify-content-evenly'>
                                    <div className='d-flex flex-column text-center'>
                                        <i className='ns-icon-drag-drop'></i>
                                        <span className='fw-bold'>Drag Here</span>
                                    </div>
                                    <div className='fw-bold'>
                                        OR
                                    </div>
                                    <div className='d-flex flex-column text-center'>
                                        <i className='ns-icon-pdf-thumbnail'></i>
                                        <span className='fw-bold'>Browse Your File</span>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                        {/* <DialogActions>
                            <Button className='btn-red' onClick={() => this.props.createFileButtonClicked(this.state.name)}>Create</Button>
                            <Button className='btn-white' onClick={this.handleClose}>Cancel</Button>
                        </DialogActions> */}
                    </Dialog>
                }
            </div>
        );
    }
}