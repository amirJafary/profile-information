import React, { Component } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default class MUDialogCreateFolder extends Component {
    render() {
        return (
            <>
                <Dialog open={this.props.open} onClose={this.props.handleClose}>
                    <div className='d-flex parent-title-dialog align-items-center pe-3 justify-content-space-between'>
                        <DialogTitle>{this.props.titleText}(<span className='url'>./root/</span>)</DialogTitle>
                        <i onClick={this.props.handleClose} className='ms-auto ns-icon-close icon-close-dialog'></i>
                    </div>
                    <DialogContent>
                        <TextField className='mt-5'
                            onChange={this.props.inputFileNameChanged}
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
                        <Button className='btn-red' onClick={() => this.props.createFileButtonClicked(this.props.name)}>{this.props.buttonText}</Button>
                        <Button className='btn-white' onClick={this.props.handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}
