import axios from "axios"

const GetEditPersonalSetting = (callback,birthDate,cityId,companyName,description,email,firstName,genderTypeId,isCompany,lastName,licenceNumber,nationalCode,trn) => {
    let url = 'http://172.17.17.101:8088/api/en/Account/Profile/EditPersonalSetting?';
    let data = {
        birthDate: "1995-11-22T00:00:00.000Z",
        cityId: 488,
        companyName: "",
        description: "in the name of god",
        email: "amir@gmail.com",
        firstName: "TEST",
        genderTypeId: 1,
        isCompany: false,
        lastName: "TESTFAMILY",
        licenceNumber: "",
        nationalCode: "123",
        trn: "",
    };
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjUzODciLCJyb2xlIjoiVXNlciIsIm5iZiI6MTYzNzU5Mjg4MSwiZXhwIjoxNjQwMTg0ODgxLCJpYXQiOjE2Mzc1OTI4ODF9.2feTeNYY8LdOCQKcYF_TNSA-gyp7XhzLk6SqmUTZrwk';

    axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => { callback(res.data.messageItems[0].data) })
}

export { GetEditPersonalSetting };