import axios from "axios"

const GetEditPersonalSetting = (callback,birthDate,cityId,companyName,description,email,firstName,genderTypeId,isCompany,lastName,licenceNumber,nationalCode,trn) => {
    let url = 'http://172.17.17.101:8088/api/en/Account/Profile/EditPersonalSetting?';
    let data = {
        birthDate: `${birthDate}T00:00:00.000Z`,
        cityId: cityId,
        companyName: companyName,
        description: description,
        email: email,
        firstName: firstName,
        genderTypeId: genderTypeId,
        isCompany: isCompany,
        lastName: lastName,
        licenceNumber: licenceNumber,
        nationalCode: nationalCode,
        trn: trn,
    };
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjUzODciLCJyb2xlIjoiVXNlciIsIm5iZiI6MTYzNzU5Mjg4MSwiZXhwIjoxNjQwMTg0ODgxLCJpYXQiOjE2Mzc1OTI4ODF9.2feTeNYY8LdOCQKcYF_TNSA-gyp7XhzLk6SqmUTZrwk';

    axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => { callback(res.data.messageItems[0]) })
}

export { GetEditPersonalSetting };