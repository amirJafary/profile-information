import React, { Component } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default class MUTextField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.deafultValue
        }
    }

    textFieldChanged = (e) => {
        this.props.textFieldChanged(e.target.value)
    }

    render() {
        return (
            <div>
                <Box component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                    noValidate
                    autoComplete="off">
                    <TextField id={this.props?.id}
                        value={this.props.deafultValue}
                        label={this.props?.labalName}
                        type={this.props?.type}
                        autoComplete="current-password"
                        onChange={this.textFieldChanged}
                        variant="standard" />
                </Box>
            </div>
        )
    }
}
