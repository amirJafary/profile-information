import axios from "axios"

const PostPreparing = (callback,pageLength,deafultPageNumber,searchText) => {
    let url = 'http://172.17.17.101:8088/api/en/Order/SharedSheetOrderByState/Preparing?';
    let data = {
        currentPageIndex: deafultPageNumber,
        filter:{
            categoryId: null,
            fromConfirmDate: null,
            fromSubmitDate: null,
            hasTransferRequest: false,
            invoiceId: null,
            searchTerm: searchText,
            sharedSheetOrderIds: [],
            toConfirmDate: null,
            toSubmitDate: null,
            turnaround: null,
            twoSidePrintingType: null,
        },
        pageLength: pageLength
    };
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEyMzMiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MzgwMzA1MTUsImV4cCI6MTY0MDYyMjUxNSwiaWF0IjoxNjM4MDMwNTE1fQ.-DuGEEUxMOdQGKWqIDLbwSNk-TIpeXOEXsm4s8DFSIg';

    axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => { callback(res.data.messageItems[0].data) })
}

export { PostPreparing };