import React, { Component } from 'react'

import {GetFiles} from '../../services/GetFiles'

class GetImajeSrcFromAPI extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            thumbnailUrl: props.thumbnail,
            thumbnailContent: ''
        };
    }
    
    componentDidMount(){
        GetFiles(this.GetFilesCallback,this.state.thumbnailUrl)
    }

    GetFilesCallback = (res) => {
        this.setState({
            thumbnailContent: res
        });
    }
    render(){
        return(<img src={this.state.thumbnailContent} alt='file manager imajes'/>);
    }
}

export default GetImajeSrcFromAPI