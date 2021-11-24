import axios from "axios"

const PostPreparing = (callback) => {
    let url = 'http://172.17.17.101:8088/api/en/Order/SharedSheetOrderByState/Preparing?';
    let data = {
        currentPageIndex: 1,
        filter:{
            categoryId: null,
            fromConfirmDate: null,
            fromSubmitDate: null,
            hasTransferRequest: false,
            invoiceId: null,
            searchTerm: "",
            sharedSheetOrderIds: [],
            toConfirmDate: null,
            toSubmitDate: null,
            turnaround: null,
            twoSidePrintingType: null,
        },
        pageLength: 10
    };
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEwOCIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjM3NjgyMTMzLCJleHAiOjE2NDAyNzQxMzMsImlhdCI6MTYzNzY4MjEzM30.YSfT6EaLsJsIOCqH7Wwwi8c1qJ2lAfcz2p9i-QRTwTg';

    axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => { callback(res.data.messageItems[0]) })
}

export { PostPreparing };