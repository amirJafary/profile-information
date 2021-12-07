import axios from 'axios';

const PostDeleteFile = (callback, name,id) => {
    let url = 'http://172.17.17.101:8088/api/en/FileManager/FolderManagement/Delete?'
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEyMzMiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MzgzNDUyNjUsImV4cCI6MTY0MDkzNzI2NSwiaWF0IjoxNjM4MzQ1MjY1fQ.n2jfJuHL4A3GhClc4We-iR1LWvGoLjr3Gg1CreccjZ4'
    let data = {
        name: name,
        id: id
    }

    axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
        .then(res => { callback(res.data) })
}

export { PostDeleteFile };