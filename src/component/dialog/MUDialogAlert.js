import React, { Component } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import '../../asset/scss/muDialogAlert.scss'

export default class MUDialogAlert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.openAlert,
        }
    }

    handleClose = () => {
        this.setState({ open: false }, () => this.props.stateOpenAlertChanged(this.state.open));
    };

    render() {
        return (
            <div className='alert-parent'>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogContent className='alert'>
                        <div className='d-flex h-100 align-items-center'>
                            <i className='ns-icon-exclemation fs-5rem'></i>
                            <div>
                                Are you sure to delete <span className='fw-bold text-overflow-ellipsis'>{this.props.fileName}</span> ?
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button className='btn-red' onClick={this.props.yesButtonClicked}>Yes</Button>
                        <Button className='btn-white' onClick={this.handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}