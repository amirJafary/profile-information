import React, { Component } from 'react'
import MUSelect from '../../../component/select/MUSelect'
import MUTextField from '../../../component/textField/MUTextField'
import { GetEditPersonalSetting } from '../../../services/GetEditPersonalSetting'
import { GetPersonalInformation } from '../../../services/GetPersonalInformation'

import '../../../asset/scss/profileInformation.scss'

export default class PersonalInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            states: [{ name: 'Tehran', id: 39 }],
            cities: [
                { name: 'تهران', id: 488 },
                { name: 'دماوند', id: 489 },
                { name: 'ورامین', id: 490 }
            ],
            genders: [
                { name: 'Male', id: 1 },
                { name: 'Female', id: 2 },
            ],
            personalInformations: [],
            genderTypeId: 1,
            birthDate: "",
            cityId: 488,
            companyName: "",
            description: "",
            email: "",
            firstName: "",
            isCompany: false,
            isEditable: true,
            lastName: "",
            licenceNumber: "",
            nationalCode: "",
            stateId: 39,
            trn: "",
            message: ''
        }
    }


    componentDidMount() {
        GetPersonalInformation(this.getPersonalInformationCallback);
    }

    getPersonalInformationCallback = (res) => {

        let genderTypeId = res.genderTypeId;
        let birthDate = res.birthDate.split('T')[0];
        let cityId = res.cityId;
        let companyName = res.companyName;
        let description = res.description;
        let email = res.email;
        let firstName = res.firstName;
        let lastName = res.lastName;
        let licenceNumber = res.licenceNumber;
        let nationalCode = res.nationalCode;
        let stateId = res.stateId;
        let trn = res.trn;

        this.setState({
            personalInformations: res,
            genderTypeId: genderTypeId,
            birthDate: birthDate,
            cityId: cityId,
            companyName: companyName,
            description: description,
            email: email,
            firstName: firstName,
            lastName: lastName,
            licenceNumber: licenceNumber,
            nationalCode: nationalCode,
            stateId: stateId,
            trn: trn,
        }, () => console.info(this.state.personalInformations))
    }

    saveButtonClicked = () => {
        GetEditPersonalSetting(this.GetEditPersonalSettingCallback, this.state.birthDate, this.state.cityId, this.state.companyName, this.state.description, this.state.email, this.state.firstName, this.state.genderTypeId, this.state.isCompany, this.state.lastName, this.state.licenceNumber, this.state.nationalCode, this.state.trn)
    }

    discardButtonClicked = () => {
        GetPersonalInformation(this.getPersonalInformationCallback)
    }

    GetEditPersonalSettingCallback = (res) => {
        alert(res.messageText)
    }

    textFieldLastNameChanged = (value) => this.setState({ lastName: value });
    textFieldFirstNameChanged = (value) => this.setState({ firstName: value });
    textFieldGenderTypeChanged = (value) => this.setState({ genderTypeId: value });
    textFieldIdNumberChanged = (value) => this.setState({ nationalCode: value });
    textFieldBirthDateChanged = (value) => this.setState({ birthDate: value });
    textFieldEmailChanged = (value) => this.setState({ email: value });
    textFieldDescriptionChanged = (value) => this.setState({ description: value });
    inputSelectGenderTypeChanged = (value) => this.setState({ genderTypeId: value });
    inputSelectStateChanged = (value) => this.setState({ stateId: value });
    inputSelectCityChanged = (value) => this.setState({ cityId: value }, () => console.info(value));

    render() {
        return (
            <div>
                <div className='card-body'>
                    <div className='fw-bold mb-2'>Personal Information</div>
                    <span className='d-flex Account-Type flex-column font-size-12 text-align-center'><span>Mobile</span><span className='fw-bold font-size-14'>+989121111111</span></span>
                    <div className='d-flex mt-3'>

                        <MUSelect inputSelectChanged={(value) => this.inputSelectGenderTypeChanged(value)}
                            id='GenderType'
                            deafultValue={this.state.genderTypeId}
                            values={this.state.genders}
                            label='Gender Type *' />

                        <MUTextField
                            textFieldChanged={(value) => this.textFieldFirstNameChanged(value)}
                            id='FirstName'
                            deafultValue={this.state.firstName}
                            labalName='First Name *'
                            type='text' />

                        <MUTextField id='LastName'
                            deafultValue={this.state.lastName}
                            labalName='Last Name *'
                            type='text'
                            textFieldChanged={(value) => this.textFieldLastNameChanged(value)} />

                        <MUTextField id='IdNumber'
                            deafultValue={this.state.nationalCode}
                            labalName='Id Number'
                            type='text'
                            textFieldChanged={(value) => this.textFieldIdNumberChanged(value)} />

                    </div>
                    <div className='d-flex align-items-end'>
                        <div className='col-3'>

                            <MUTextField deafultValue={this.state.birthDate}
                                id='BirthDate'
                                type='date'
                                textFieldChanged={(value) => this.textFieldBirthDateChanged(value)} />

                        </div>
                        <div className='col-6'>

                            <MUTextField deafultValue={this.state.email}
                                id='Email'
                                labalName='Email'
                                type='email'
                                textFieldChanged={(value) => this.textFieldEmailChanged(value)} />

                        </div>
                    </div>
                    <div className='d-flex'>

                        <MUSelect deafultValue={this.state.stateId}
                            id='State'
                            values={this.state.states}
                            label='State *'
                            inputSelectChanged={(value) => this.inputSelectStateChanged(value)} />

                        <MUSelect deafultValue={this.state.cityId}
                            id='City'
                            values={this.state.cities}
                            label='City *'
                            inputSelectChanged={(value) => this.inputSelectCityChanged(value)} />

                    </div>
                    <div>

                        <MUTextField deafultValue={this.state.description}
                            id='Description'
                            labalName='Description'
                            type='text'
                            textFieldChanged={(value) => this.textFieldDescriptionChanged(value)} />

                    </div>
                    <div className='mt-5 text-align-end w-100'>
                        <button onClick={this.saveButtonClicked} className='btn-red'><i className='ns-icon-save me-2'></i>save</button>
                        <button onClick={this.discardButtonClicked} className='btn-red-outline ms-2'><i className='ns-icon-close red-dark me-2'></i>discard</button>
                    </div>
                </div>
            </div>
        )
    }
}
