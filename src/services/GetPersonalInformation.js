import axios from 'axios';

const GetPersonalInformation = (callback) => {
    let url = 'http://172.17.17.101:8088/api/en/Account/Profile/GetPersonalInformation?'
    axios.get(url, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjUzODciLCJyb2xlIjoiVXNlciIsIm5iZiI6MTYzNzU5Mjg4MSwiZXhwIjoxNjQwMTg0ODgxLCJpYXQiOjE2Mzc1OTI4ODF9.2feTeNYY8LdOCQKcYF_TNSA-gyp7XhzLk6SqmUTZrwk',
        },
    })
        .then(res => { callback(res.data.messageItems[0].data) })
}

export { GetPersonalInformation };