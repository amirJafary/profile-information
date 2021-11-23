import axios from 'axios';

const GetCities =(callback)=>{
    axios.get('http://172.17.17.101:8088/api/en/Common/Common/GetCities?&stateId=39')
    .then(res=>{ callback(res.data.messageItems[0].data) })
}

export {GetCities};