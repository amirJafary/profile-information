import axios from 'axios';

const GetFileAndFolders =(callback)=>{
    let url ='http://172.17.17.101:8088/api/en/FileManager/FolderManagement/GetFileAndFolders?'
    axios.get(url,{
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEyMzMiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MzgzNDUyNjUsImV4cCI6MTY0MDkzNzI2NSwiaWF0IjoxNjM4MzQ1MjY1fQ.n2jfJuHL4A3GhClc4We-iR1LWvGoLjr3Gg1CreccjZ4',
        },
    })
    .then(res=>{ callback(res.data.messageItems[0].data) })
}

export {GetFileAndFolders};