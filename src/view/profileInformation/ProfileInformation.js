import React, { Component } from 'react'
import Main from './main/Main'
import SideBar from './sideBar/SideBar'
import '../../asset/scss/profileInformation.scss'

class ProfileInformation extends Component {
    render() {
        return (
            <div className='container d-flex py-5'>
                <SideBar/>
                <Main/>
            </div>
        )
    }
}

export default ProfileInformation;