import React, { Component } from 'react'

import {GetFiles} from '../../services/GetFiles'
import '../../asset/scss/fileManager.scss'

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
        return(<img className='w-100' src={this.state.thumbnailContent} alt='file manager imajes' style={{maxHeight:'100px'}}/>);
    }
}

export default GetImajeSrcFromAPI