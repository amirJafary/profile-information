import React, { Component } from 'react'
import SideBar from '../profileInformation/sideBar/SideBar'
import Main from './main/Main'

export default class Preparing extends Component {
    render() {
        return (
            <div className='container d-flex py-5'>
                <SideBar/>
                <Main/>
            </div>
        )
    }
}
