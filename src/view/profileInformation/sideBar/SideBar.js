import React, { Component } from 'react'
import DifrentOptions from './DifrentOptions'
import Information from './Information'
import Orders from './Orders'

export default class SideBar extends Component {
    render() {
        return (
            <div className='w-25'>
                <Information/>
                <Orders/>
                <DifrentOptions/>
            </div>
        )
    }
}
