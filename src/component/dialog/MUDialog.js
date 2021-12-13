import React, { Component } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import '../../asset/scss/muDialog.scss'
import { GetExists } from '../../services/GetExists'
import { PostUpload } from '../../services/PostUpload'
import { Col } from 'react-bootstrap';
import UploadFileIsFalse from './UploadFileIsFalse';
import MUDialogCreateFolder from './MUDialogCreateFolder';
import UploadFileIsTrue from './UploadFileIsTrue';
import { GetFiles } from '../../services/GetFiles'

export default class MUDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            openDialog: this.props.openDialog,
            existFileDialog: false,
            name: '',
            uploadedFiles: [],
            warningTextForUploadFile: [],
            hasError: false,
            filenameState: [],
            isShowPreparingMessage: false,
            percent: 0,
            loaded: 0,
            total: 0,
            folderNames: this.props.folderNames,
            responseIs: false,
            uploadedFileInformation: null,
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        }, () => this.props.stateOpenChanged(this.state.open));
    };

    handleCloseDialog = () => {
        this.setState({
            openDialog: false
        }, () => this.props.stateOpenDialogChanged(this.state.openDialog));
    };

    inputFileNameChanged = (e) => {
        console.log(e.target.value);
        this.setState({
            name: e.target.value
        })
    }

    openImajeClicked = e => {
        const { files } = e.target;
        if (files && files.length) {
            const filenameState = this.state.filenameState;
            let uploadedFiles = this.state.uploadedFiles;
            uploadedFiles.push(files[0])
            filenameState.push(files[0].name)
            this.setState({ filenameState })
            this.setState({ uploadedFiles })
            GetExists(this.GetExistsCallback, files[0].name)
        }
    }

    GetExistsCallback = (res) => {
        if (!!res.hasError) {
            let uploadedFiles = this.state.uploadedFiles;
            let lastUploaded = this.state.uploadedFiles[this.state.uploadedFiles.length - 1];
            lastUploaded["existName"] = res?.messageItems[0]?.messageText;
            lastUploaded["isExist"] = res?.hasError;
            uploadedFiles.pop();
            uploadedFiles.push(lastUploaded)
            this.setState({
                uploadedFiles
            })
        } else {
            this.setState({ isShowPreparingMessage: true });
            let filterItems = this.state.uploadedFiles.filter(item => item.isExist === undefined);
            PostUpload(this.PostUploadCallback, filterItems[filterItems.length - 1], 0, '', this.onUploadProgressCallback)
        }
    }

    PostUploadCallback = (res) => {
        this.setState({ responseIs: true })
        this.setState({
            uploadedFileInformation: res.messageItems[0]?.data
        });
        let thumbnail = res.messageItems[0]?.data[0]?.thumbnail
        GetFiles(this.GetFilesCallback, thumbnail);
    }

    GetFilesCallback = (res) => {
        console.info(res, this.state.thumbnailContent, "*******")
        this.setState({
            thumbnailContent: res
        });
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

    stateUploadedFilesChanged=(uploadedFiles)=>{
        this.setState({
            uploadedFiles:uploadedFiles
        })
    }

    render() {
        console.log(this.state.thumbnailContent);
        return (
            <div>
                {!!this.props.ok === true ?
                    <MUDialogCreateFolder handleClose={this.handleClose}
                        titleText={this.props.titleText}
                        open={this.state.open}
                        deafultName={this.props?.deafultName}
                        inputFileNameChanged={this.inputFileNameChanged}
                        createFileButtonClicked={this.props.createFileButtonClicked}
                        buttonText={this.props.buttonText}
                        name={this.state.name} />
                    :
                    <Dialog className='upload-dialog' open={this.state.openDialog} onClose={this.handleCloseDialog}>
                        <div className='d-flex parent-title-dialog align-items-center pe-3 justify-content-space-between'>
                            <DialogTitle>{this.props.titleText}(<span className='url'>./root/</span>)</DialogTitle>
                            <i onClick={this.handleCloseDialog} className='ms-auto ns-icon-close icon-close-dialog'></i>
                        </div>
                        <DialogContent>
                            <div className='d-flex h-100'>
                                <Col className='h-100' xs={this.state.uploadedFiles?.length >= 1 ? 4 : 12}>
                                    <UploadFileIsFalse uploadedFiles={this.state.uploadedFiles}
                                        openImajeClicked={this.openImajeClicked} />
                                </Col>
                                {this.state.uploadedFiles?.length >= 1 ?
                                    <Col xs={8} className='d-flex flex-column overflow-auto'>
                                        <UploadFileIsTrue uploadedFiles={this.state.uploadedFiles}
                                            replaceButtonClicked={this.replaceButtonClicked}
                                            thumbnailContent={this.state.thumbnailContent}
                                            responseIs={this.state.responseIs}
                                            uploadedFileInformation={this.state.uploadedFileInformation}
                                            keepBothButtonClicked={this.keepBothButtonClicked}
                                            cancelButtonClicked={this.cancelButtonClicked}
                                            stateUploadedFilesChanged={(uploadedFiles)=>this.stateUploadedFilesChanged(uploadedFiles)}
                                            GetFileAndFoldersCallback={this.props.GetFileAndFoldersCallback}
                                            isShowPreparingMessage={this.state.isShowPreparingMessage}
                                            folderNames={this.state.folderNames}
                                            loaded={this.state.loaded}
                                            total={this.state.total}
                                            percent={this.state.percent}
                                            deleteIconInUploadingFileClicked={this.deleteIconInUploadingFileClicked} />
                                    </Col>
                                    : <span></span>}
                            </div>
                        </DialogContent>
                    </Dialog>
                }
            </div>
        );
    }
}