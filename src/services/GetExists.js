import axios from 'axios';

const GetExists = (callback,fileName) => {

    let url='http://172.17.17.101:8088/api/en/FileManager/FileManagement/Exists?&Name='+fileName+''
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEyMzMiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MzgyNTU2NDksImV4cCI6MTY0MDg0NzY0OSwiaWF0IjoxNjM4MjU1NjQ5fQ.AJ7eTQEYtJMIJM3CsCNlTuysxv8S87LwDYAWpY4clls';
    axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => { callback(res.data) })

}

export { GetExists };