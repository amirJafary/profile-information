import React, { Component } from 'react'
import SideBar from '../profileInformation/sideBar/SideBar'
import MainOrderDetail from './main/MainOrderDetail'

export default class OrderDetail extends Component {
    render() {
        return (
           <div className='container d-flex py-5'>
               <SideBar/>
               <MainOrderDetail/>
           </div>
        )
    }
}
