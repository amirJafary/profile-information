import React, { Component } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default class MUSelect extends Component {

    constructor(props) {
        super(props);
        this.state={
            gender:this.props.deafultValue,
        }
    }

    InputGenderChanged=(e)=>{
        this.setState({
            gender:e.target.value
        },()=>this.props.inputSelectChanged(this.state.gender))
        
    }
    
    // this.props.InputSelectChanged()

    render() {
        return (
            <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">{this.props?.label}</InputLabel>
                    <Select
                        value={this.state.gender}
                        labelId="demo-simple-select-standard-label"
                        id={this.props.id}
                        onChange={this.InputGenderChanged}>
                        {this.props.values?.map(item=>
                            <MenuItem id={item.id} value={item.id}>{item.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
        )
    }
}
