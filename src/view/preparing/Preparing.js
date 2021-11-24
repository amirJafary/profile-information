import React, { Component } from 'react'
import SideBar from '../profileInformation/sideBar/SideBar'
import Main from './main/Main'

export default class Preparing extends Component {
    render() {
        return (
            <div>
                <SideBar/>
                <Main/>
            </div>
        )
    }
}
