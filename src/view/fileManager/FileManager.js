import React, { Component } from 'react'

import '../../asset/scss/fileManager.scss'
import MUSelect from '../../component/select/MUSelect'
import { GetDiskUsage } from '../../services/GetDiskUsage'
import { GetFileAndFolders } from '../../services/GetFileAndFolders'
import { PostCreatedFileName } from '../../services/PostCreatedFileName'
import { PostDeleteFile } from '../../services/PostDeleteFile'
import { PostRename } from '../../services/PostRename'
import { GetFileAndFoldersOnDoubleClicked } from '../../services/GetFileAndFoldersOnDoubleClicked'
import MUDialog from '../../component/dialog/MUDialog'
import MUDialogAlert from '../../component/dialog/MUDialogAlert'
import GetImajeSrcFromAPI from './GetImajeSrcFromAPI'

class FileManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: [
                { id: 1, name: <i className='ns-icon-home'></i> },
                { id: 2, name: 'root' },
            ],
            usedVolume: null,
            maximumVolume: null,
            folderNames: [],
            fileThumbnails: [],
            valueOfInput: null,
            open: false,
            openDialog: false,
            fileId: null,
            fileName: '',
            fileIsFolder: true,
            fileParentId: null,
            fileThumbnail: null,
            fileClicked: false,
            openAlert: false,
            deafultName: '',
            parentIdRename: null,
            openRenameDialog: false,
            images: []
        }
    }

    componentDidMount() {
        GetDiskUsage(this.getDiskUsageCallback);
        GetFileAndFolders(this.GetFileAndFoldersCallback);
    }

    componentDidUpdate() {
        //GetFiles(this.GetFilesCallback,this.state.fileThumbnails)
    }

    GetFilesCallback = (res) => {
        let data = this.state.images
        data.push(res)
        this.setState({
            images: data
        }, () => console.log(this.state.images))
    }

    getDiskUsageCallback = (res) => {
        const maximumVolume = (res.maximumVolume / 1048576).toFixed(2);
        const usedVolume = (res.usedVolume / 1048576).toFixed(2);
        this.setState({
            maximumVolume: maximumVolume,
            usedVolume: usedVolume
        })
    }

    GetFileAndFoldersCallback = (res) => {
        let isFolderFalse = res.filter(item => item.isFolder === false);
        // let thumbnail = isFolderFalse.map(item => item.thumbnail);
        this.setState({
            folderNames: res,
            fileThumbnails: isFolderFalse
        })
    }

    inputSelectChanged = (value) => {
        this.setState({
            valueOfInput: value
        })
    }

    createFileButtonClicked = (name) => {
        PostCreatedFileName(this.PostCreatedFileNameCallback, name);
    }

    PostCreatedFileNameCallback = (res) => {
        if (!!res.data.hasError === true) {
            alert(res.data.messageItems[0]?.messageText);
        } else {
            GetFileAndFolders(this.GetFileAndFoldersCallback);
            this.setState({
                open: false
            }, () => this.state.open)
        }
    }

    stateOpenChanged = (open, openDialog) => {
        this.setState({
            open: open,
            openDialog: openDialog,
        })
    }

    stateOpenDialogChanged = (openDialog) => {
        this.setState({
            openDialog: openDialog
        })
    }

    fileClicked = (id, name, isFolder, parentId, thumbnail) => {
        this.setState({
            fileClicked: true,
            fileId: id,
            fileName: name,
            fileIsFolder: isFolder,
            fileParentId: parentId,
            fileThumbnail: thumbnail,
            deafultName: name,
            parentIdRename: parentId,
        }, () => console.info(this.state.fileId, this.state.fileName, this.state.fileIsFolder, this.state.fileParentId, this.state.fileThumbnail))
    }

    fileOnDoubleClicked = () => {
        GetFileAndFoldersOnDoubleClicked(this.GetFileAndFoldersCallback, this.state.fileId);
    }

    newFolderButtonClicked = () => {
        this.setState({
            open: true
        })
    }

    changeFileButtonClicked = (name) => {
        PostRename(this.PostRenameCallback, this.state.fileName, name, this.state.fileId)
    }

    PostRenameCallback = (res) => {
        if (!!res.hasError === true) {
            alert(res.messageItems[0]?.messageText);
        } else {
            GetFileAndFolders(this.GetFileAndFoldersCallback);
            alert(res.messageItems[0]?.messageText)
            this.setState({
                openRenameDialog: false
            }, () => this.state.openRenameDialog)
        }
    }

    uploadFileButtonClicked = () => {
        this.setState({
            openDialog: true
        })
    }

    deleteButtonClicked = () => {
        this.setState({
            openAlert: true
        })
    }

    stateOpenAlertChanged = (openAlert) => {
        this.setState({
            openAlert: openAlert
        })
    }

    yesButtonClicked = () => {
        PostDeleteFile(this.PostDeleteFileCallback, this.state.fileName, this.state.fileId);
        this.setState({
            openAlert: false
        });
    }

    PostDeleteFileCallback = (res) => {
        if (res.hasError === true) {
            alert(res?.messageItems[0]?.messageText)
        } else {
            GetFileAndFolders(this.GetFileAndFoldersCallback);
            alert(res?.messageItems[0]?.messageText)
        }
    }

    renameButtonClicked = () => {
        this.setState({ openRenameDialog: true })
    }

    stateOpenRenameDialogChanged = (open) => {
        this.setState({
            openRenameDialog: open
        })
    }

    render() {
        return (
            <div className='file-manager py-5 container'>
                <div className='d-flex section-one p-2 w-100'>

                    <button onClick={this.newFolderButtonClicked} className='new-folder-btn py-1 me-2'>
                        <i className='ns-icon-new-folder me-2'></i>
                        <span>New Folder</span>
                    </button>
                    <MUDialog key={this.state.open} createFileButtonClicked={(name) => this.createFileButtonClicked(name)}
                        open={this.state.open}
                        titleText='Create New Folder '
                        buttonText='Create'
                        ok={true}
                        stateOpenChanged={(open) => this.stateOpenChanged(open)} />

                    <div className='d-flex align-items-center'>
                        <i className='ns-icon-pie-chart me-1 h2'></i>
                        <div className='mx-1 fw-bold'>{this.state.usedVolume} MB</div>
                        /
                        <div className='ms-1 fw-bold'>{this.state.maximumVolume} MB</div>
                    </div>

                </div>
                <div className='d-flex mt-2 align-items-stretch'>
                    <div className='col-2 align-self-stretch pe-2'>
                        <div className='section-two p-2'></div>
                    </div>
                    <div className='section-three col-10 p-2'>
                        <div className='d-flex p-2 section-three-header'>
                            <div>

                                <MUSelect values={this.state.values}
                                    deafultValue={1}
                                    inputSelectChanged={(value) => this.inputSelectChanged(value)} />

                            </div>
                            <div className='d-flex uplod-refresh'>
                                <button onClick={this.uploadFileButtonClicked} className='new-folder-btn me-2 py-1'>
                                    <i className='ns-icon-upload me-2'></i>
                                    <span>Upload File</span>
                                </button>
                                <MUDialog key={this.state.openDialog}
                                    folderNames={this.state.folderNames}
                                    createFileButtonClicked={(name) => this.createFileButtonClicked(name)}
                                    openDialog={this.state.openDialog}
                                    titleText='Upload File '
                                    ok={false}
                                    GetFileAndFoldersCallback={this.GetFileAndFoldersCallback}
                                    stateOpenDialogChanged={(openDialog) => this.stateOpenDialogChanged(openDialog)} />

                                <button onClick={() => GetFileAndFolders(this.GetFileAndFoldersCallback)} className='new-folder-btn py-1'>
                                    <i className='ns-icon-refresh me-2'></i>
                                    <span>Refresh</span>
                                </button>
                            </div>
                        </div>
                        <div className='d-flex mt-2'>
                            <div className='section-three-left align-items-end overflow-auto d-flex col-8'>
                                {this.state.folderNames.map((item) =>
                                    item.isFolder ?
                                        <div onDoubleClick={this.fileOnDoubleClicked} onClick={() => this.fileClicked(item.id, item.name, item.isFolder, item.parentId, item.thumbnail)} className='d-flex flex-column w-20 text-center'>
                                            <i className='ns-icon-folder-thumbnail'></i>
                                            <span className='folder-name overflow-hidden px-2'>{item.name}</span>
                                        </div>
                                        :
                                        <div className='d-flex flex-column w-20 p-2 text-center' onClick={() => this.fileClicked(item.id, item.name, item.isFolder, item.parentId, item.thumbnail)}>
                                            <GetImajeSrcFromAPI thumbnail={item.thumbnail} />
                                            <div className='folder-name overflow-hidden px-2'>{item.name}</div>
                                        </div>
                                )}

                            </div>
                            <div className='col-4'>
                                {this.state.fileClicked === true ?
                                    <div className='d-flex section-three-right padding-auto flex-column'>
                                        <div className='text-center mb-5'><i className='ns-icon-folder fs-10rem'></i></div>

                                        <span className='fs-12'>Folder Name: <span className='fs-14 fw-bold word-break'>{this.state.fileName}</span></span>
                                        <div className='text-center justify-content-center d-flex w-100 mt-5'>
                                            <button onClick={this.deleteButtonClicked} className='new-folder-btn py-1 me-2 bg-000'>
                                                <i className='ns-icon-delete me-2'></i>
                                                <span>Delete</span>
                                            </button>

                                            <MUDialogAlert key={this.state.openAlert}
                                                openAlert={this.state.openAlert}
                                                yesButtonClicked={this.yesButtonClicked}
                                                stateOpenAlertChanged={(openAlert) => this.stateOpenAlertChanged(openAlert)}
                                                fileName={this.state.fileName} />

                                            <button onClick={this.renameButtonClicked} className='new-folder-btn py-1 bg-000'>
                                                <i className='ns-icon-rename me-2'></i>
                                                <span>Rename</span>
                                            </button>
                                            {this.state.openRenameDialog && <MUDialog key={this.state.deafultName}
                                                createFileButtonClicked={(name) => this.changeFileButtonClicked(name)}
                                                open={this.state.openRenameDialog}
                                                buttonText='Change'
                                                deafultName={this.state.deafultName}
                                                titleText='Rename '
                                                ok={true}
                                                stateOpenChanged={(open) => this.stateOpenRenameDialogChanged(open)} />}

                                        </div>
                                    </div>
                                    : <div className='section-three-right'><span className='ns-icon-no-item-selected'></span></div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileManager