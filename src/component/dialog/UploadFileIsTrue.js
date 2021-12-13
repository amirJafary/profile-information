import React, { Component } from 'react'
import LinearProgress from '@mui/material/LinearProgress';

import { GetFileAndFolders } from '../../services/GetFileAndFolders'
import { GetFiles } from '../../services/GetFiles'
import { PostUpload } from '../../services/PostUpload'

export default class UploadFileIsTrue extends Component {

    constructor(props) {
        super(props);
        console.info(this.props.thumbnailContent)
        this.state = {
            folderNames: this.props.folderNames,
            uploadedFiles: this.props.uploadedFiles,
            fileInformation: [],
            thumbnailContent: '',
            percent: 0,
            total: 0,
            loaded: 0,
            isShowPreparingMessage: true,
            responseIs:this.props.responseIs,
        }
    }

    componentDidUpdate=(prevProps)=>{
        if(!!this.props.thumbnailContent && prevProps.thumbnailContent !== this.props.thumbnailContent)
        this.setState({
            thumbnailContent:this.props.thumbnailContent
        },()=>console.info(this.state.thumbnailContent))
    }
    
    replaceButtonClicked = (name) => {
        let keepBothItem = this.state.uploadedFiles.filter(item => item.name === name);
        PostUpload(this.PostUploadCallback, keepBothItem[keepBothItem.length - 1], 2, '', this.onUploadProgressCallback)
        GetFileAndFolders(this.props.GetFileAndFoldersCallback);
    }

    keepBothButtonClicked = (name) => {
        let keepBothItem = this.state.uploadedFiles.filter(item => item.name === name);
        PostUpload(this.PostUploadCallback, keepBothItem[keepBothItem.length - 1], 1, '', this.onUploadProgressCallback)
        GetFileAndFolders(this.props.GetFileAndFoldersCallback);
    }
    
    cancelButtonClicked = (name) => {
        let keepBothItem = this.state.uploadedFiles.filter(item => item.name !== name);
        this.setState({uploadedFiles:keepBothItem},()=>this.props.stateUploadedFilesChanged(this.state.uploadedFiles))
    }

    PostUploadCallback = (res) => {
        console.info(res?.messageItems[0]?.data,'<= this is thumbnail')
        this.setState({
            uploadedFileInformation: res.messageItems[0]?.data
        });
        let thumbnail = res.messageItems[0]?.data?.thumbnail
        {
            if (thumbnail === true)
                GetFiles(this.GetFilesCallback, thumbnail);
        }
    }

    GetFilesCallback = (res) => {
        this.setState({
            thumbnailContent: res
        },()=>this.state.thumbnailContent[0]);
    }

    onUploadProgressCallback = (percent, Total, Loaded) => {
        console.log(percent, Total, Loaded);
        this.setState({ isShowPreparingMessage: false });
        this.setState({
            percent: percent,
            total: Total,
            loaded: Loaded
        })
    }

    render() {
        return (
            <>
                {this.props.uploadedFiles.map((item) => {
                    if (!!item.isExist) {
                        return (
                            <div className='ps-2 mb-2 w-100'>
                                <div className='rows-of-upload-file d-flex align-items-center flex-row'>
                                    <div className='col-3 p-2'>
                                        <div className='d-flex align-items-center'>
                                            <i className='ns-icon-jpg-file fs-2rem'></i>
                                            <span className='fs-12'>{item?.name}</span>
                                        </div>
                                    </div>
                                    <div className='col-5 p-2'>
                                        <div className='d-flex align-items-center'>
                                            <i className='ns-icon-exclemation fs-2rem'></i>
                                            <span className='text-orange'>Waiting</span>
                                        </div>
                                        <span className='fs-12 text-orange'>{item?.existName}</span>
                                    </div>
                                    <div className='col-4 text-end p-2'>
                                        <div className='d-flex align-items-center'>
                                            <button onClick={() => this.replaceButtonClicked(item.name)} className='btn-transparent me-1'>Replace</button>
                                            <button onClick={() => this.keepBothButtonClicked(item.name)} className='btn-transparent me-1'>Keep Both</button>
                                            <button onClick={() => this.cancelButtonClicked(item.name)} className='btn-transparent'>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className='ps-2 mb-2 w-100'>
                                <div className='rows-of-upload-file d-flex align-items-center flex-row'>
                                    <div className='col-3 p-2'>
                                        <div className='d-flex align-items-center'>
                                            <i className='ns-icon-jpg-file fs-2rem'></i>
                                            <span className='fs-12'>{item?.name}</span>
                                        </div>
                                    </div>
                                    <div className='col-7 p-2'>
                                        {this.props.isShowPreparingMessage ?
                                            <div>Preparing the file for upload...</div>
                                            : <>
                                                {!!this.props.responseIs === false ?
                                                    <div className='d-flex px-2 flex-column align-items-center'>
                                                        {this.props.percent === 100 ?
                                                            <div>Uploading done successfully, Please wait around 2 minutes... </div>
                                                            :
                                                            <div className='w-100 d-flex justify-content-between'>
                                                                <div>{this.props.loaded} from {this.props.total}</div>
                                                                <div>{this.props.percent} %</div>
                                                            </div>
                                                        }
                                                        <LinearProgress className='w-100' variant="determinate" value={this.props.percent} />
                                                    </div>
                                                    :
                                                    <div className='d-flex px-2 align-items-center'>
                                                        <div className='w-100 d-flex justify-content-between'>
                                                            <img className='w-25' src={this.state.thumbnailContent} alt='imaje' style={{ maxHeight: '70px' }} />
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        }
                                    </div>
                                    <div className='col-2 text-end p-2'>
                                        <button className='btn-transparent' onClick={this.props.deleteIconInUploadingFileClicked}><i className='ns-icon-delete h5'></i></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </>
        )
    }
}
