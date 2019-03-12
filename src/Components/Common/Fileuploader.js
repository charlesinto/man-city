import React, { Component } from 'react';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { firebase } from '../../Firebase';
import { Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons'

class Fileuploader extends Component {
    state = {
        isLoading:false,
        fileUrl:'',
        uploadStart: false,
        name:''
    }
    static getDerivedStateFromProps(props, state){
        const { defaultImg, defaultImgName } = props
        if(props.defaultImg){
            return state = {
                fileUrl: defaultImg,
                name:defaultImgName
            }
        }
        return null
    }
    handleProgress(value, id){
    }
    handleSuccess(filename){
        const { onUploadSuccess, dir,id } = this.props;
        this.setState({
            name: filename
        })
        firebase
        .storage()
        .ref(dir)
        .child(filename)
        .getDownloadURL()
        .then(url => onUploadSuccess(url, filename, id));

    }
    renderUploadButton(){
        const {
                accept, id, dir, onProgress,
                onUploadStart, onUploadError
            } = this.props;
        return (
            <CustomUploadButton 
            accept={accept}
            randomizeFilename
            storageRef={firebase.storage().ref(dir)}
            onUploadStart={() => onUploadStart(id)}
            onUploadError={() => onUploadError(id)}
            onUploadSuccess={(filename) => this.handleSuccess(filename)}
            onProgress={(value) => onProgress(value, id)}
            style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4}}
            
            >
                Upload
            </CustomUploadButton>
        )
    }
    handleReset(){
        const { onReset, id, dir } = this.props;
        
        firebase.storage().ref(dir)
            .child(this.state.name)
            .delete()
            this.setState({
                fileUrl:'',
                name:''
            });
            onReset(id);
        
    }
    renderResetButton(){
        return (
            <Button variant="contained" color="secondary" onClick={() => this.handleReset()} >
                Remove
                <Delete />
            </Button>
        )
    }
    render() {
        return (
            <div style={{...styles.containerStyle, ...this.props.style}}>
                
                {this.state.fileUrl ? this.renderResetButton() :  this.renderUploadButton()}
            </div>
        );
    }
}

const styles = {
    containerStyle:{

    }
}

export {Fileuploader};