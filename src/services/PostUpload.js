import axios from 'axios';

const PostUpload = (callback, files, actionId, parentId, onUploadProgressCallback) => {
    let url = 'http://172.17.17.101:8088/api/en/FileManager/Upload/Upload?'
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEyMzMiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MzgzNDUyNjUsImV4cCI6MTY0MDkzNzI2NSwiaWF0IjoxNjM4MzQ1MjY1fQ.n2jfJuHL4A3GhClc4We-iR1LWvGoLjr3Gg1CreccjZ4'
    let data = new FormData();
    data.append('file', files, files.name);
    data.append('duplicateFileActionType', actionId);
    data.append('parentId', !!parentId ? parentId : '');

    axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (data) => {
            const { loaded, total } = data;
            const percent = Math.floor((loaded * 100) / total);
            const Total = (total / 1024000).toFixed(2);
            const Loaded = (loaded / 1024000).toFixed(2);
            onUploadProgressCallback(percent, Total, Loaded);
        }
    })
        .then(res => {
            callback(res.data)
        })
}

export { PostUpload };