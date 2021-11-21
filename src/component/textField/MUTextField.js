import React, { Component } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default class MUTextField extends Component {
    render() {
        return (
            <div>
                <Box component="form"
                    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                    noValidate
                    autoComplete="off">
                    <TextField id={this.props.id}
                        label={this.props.labalName}
                        type={this.props.type}
                        autoComplete="current-password"
                        variant="standard"/>
                </Box>
            </div>
        )
    }
}
