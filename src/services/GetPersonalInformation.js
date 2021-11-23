import axios from 'axios';

const GetPersonalInformation =(callback)=>{
    axios.get('http://172.17.17.101:8088/api/en/Account/Profile/GetPersonalInformation?')
    .then(res=>{ callback(res.data.messageItems[0].data) })
}

export {GetPersonalInformation};