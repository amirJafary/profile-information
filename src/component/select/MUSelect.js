import React, { Component } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default class MUSelect extends Component {

    constructor(props) {
        console.table(props);
        super(props);
        this.state={
            gender:this.props.deafultValue,
        }
    }

    InputGenderChanged=(e)=>{
        this.setState({
            gender:e.target.value
        })
    }
    
    render() {
        return (
            <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">{this.props?.label}</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id={this.props.id}
                        value={this.state.gender}
                        onChange={this.InputGenderChanged}>
                        <MenuItem value={0}>{this.props?.firstValue}</MenuItem>
                        <MenuItem value={1}>{this.props?.secondValue}</MenuItem>
                        <MenuItem value={2}>{this.props?.thirdValue}</MenuItem>
                    </Select>
                </FormControl>
            </div>
        )
    }
}
