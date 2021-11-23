import React, { Component } from 'react'
import MUSelect from '../../../component/select/MUSelect'
import MUTextField from '../../../component/textField/MUTextField'
import {GetEditPersonalSetting} from '../../../services/GetEditPersonalSetting'

import '../../../asset/scss/profileInformation.scss'

export default class PersonalInformation extends Component {

    constructor(props) {
        super(props);
        this.state={
            states:[{name:'Tehran' , id:39}],
            cities:[
                {name:'تهران' , id:488},
                {name:'دماوند' , id:489},
                {name:'ورامین' , id:490}
            ],
        }
    }
    
    saveButtonClicked=()=>{
        GetEditPersonalSetting(this.GetEditPersonalSettingCallback)
    }

    GetEditPersonalSettingCallback=(res)=>{
        console.info(res);
    }

    render() {
        return (
            <div>
                <div className='card-body'>
                    <div className='fw-bold mb-2'>Personal Information</div>
                    <span className='d-flex Account-Type flex-column font-size-12 text-align-center'><span>Mobile</span><span className='fw-bold font-size-14'>+98 936 4500972</span></span>
                    <div className='d-flex mt-3'>
                        <MUSelect id='GenderType' deafultValue='No one' label='Gender Type *' firstValue='No one' secondValue='Male' thirdValue='Female'/>
                        <MUTextField id='FirstName' labalName='First Name *' type='text'/>
                        <MUTextField id='LastName' labalName='Last Name *' type='text'/>
                        <MUTextField id='IdNumber' labalName='Id Number' type='text'/>
                    </div>
                    <div className='d-flex align-items-end'>
                        <div className='col-3'><MUTextField id='BirthDate' type='date'/></div>
                        <div className='col-6'><MUTextField id='Email' labalName='Email' type='email'/></div>
                    </div>
                    <div className='d-flex'>
                        <MUSelect id='State' values={this.state.states} label='State *'/>
                        <MUSelect id='City' values={this.state.cities} label='City *'/>
                    </div>
                    <div><MUTextField id='Description' labalName='Description' type='text'/></div>
                    <div className='mt-5 text-align-end w-100'>
                        <button onClick={this.saveButtonClicked} className='btn-red'><i className='ns-icon-save me-2'></i>save</button>
                        <button className='btn-red-outline ms-2'><i className='ns-icon-close red-dark me-2'></i>discard</button>
                    </div>
                </div>
            </div>
        )
    }
}
