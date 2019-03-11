import React, { Component } from 'react';
import AdminLayout from '../../HOC/AdminLayout';
import {FormField} from '../../Common/FormField';
import async from 'async';
import {CircularProgress } from '@material-ui/core';
import Helper from '../../../Helper';
import { firebase, firebaseDB, firebasePlayers} from '../../../Firebase';
import { Fileuploader } from '../../Common';
import avatar from '../../../Resources/images/avatar.png';

class AddEditPlayer extends Component {
    state ={
        playerId:'',
        formType:'',
        formError: false,
        formSuccess: '',
        defaultImg:'',
        formdata:{
            name:{
                element: 'input',
                value: '',
                config:{
                    name:'name_input',
                    type:'text',
                    placeholder:'enter name',
                    label: 'Player FirstName'
                },
                validation:{
                    required: true,
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
            lastname:{
                element: 'input',
                value: '',
                config:{
                    name:'lastname_input',
                    type:'text',
                    placeholder:'enter name',
                    label: 'Player LastName'
                },
                validation:{
                    required: true,
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
            number:{
                element: 'input',
                value: '',
                config:{
                    name:'number_input',
                    type:'text',
                    placeholder:'enter number',
                    label: 'Player Number'
                },
                validation:{
                    required: true,
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
            position:{
                element: 'select',
                value: '',
                config:{
                    name:'position_input',
                    type:'select',
                    placeholder:'Select one',
                    label: 'Position',
                    options:[{key:'Defence', value:'Defence'},
                                {key:'Striker', value:'Striker'},
                                {key:'Midfield', value:'Midfield'}
                            ]
                },
                validation:{
                    required: true,
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
            image:{
                element:'image',
                value:'',
                isLoading: false,
                percentageLoaded: null,
                label:'Player Image',
                validation:{
                    required: true,
                },
                valid: false
            }
        }
    }

    constructor(){
        super();
        this.onProgress = this.onProgress.bind(this);
        this.onUploadError = this.onUploadError.bind(this);
        this.onUploadStart = this.onUploadStart.bind(this);
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
        this.onReset = this.onReset.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    onReset(id){
        this.setState({
            defaultImg:'',
            formdata:{...this.state.formdata, [id]: {...this.state.formdata[id], value:'', isLoading: false} }
        })
    }
    onUploadSuccess(fileUrl,filename, id){
        this.setState({
            defaultImg: fileUrl,
            formdata: {...this.state.formdata, [id]: {...this.state.formdata[id], isLoading: false}}
        })
        this.onChange('',id, filename)
    }
    onUploadError(id){
        this.setState({
            formdata: {...this.state.formdata, [id]:{...this.state.formdata[id],isLoading:false } }
        })
    }
    onProgress(value, id){
        this.setState({
            formdata: {...this.state.formdata, [id]:{...this.state.formdata[id],percentageLoaded: value } }
        })
    }
    onUploadStart(id){
        console.log('stated', id)
        this.setState({
            formdata: {...this.state.formdata, [id]:{...this.state.formdata[id],isLoading:true } }
        })
        console.log('', this.state.formdata[id])
    }
    componentDidMount(){
        this.props.match.params.id ? this.getFormData(this.props.match.params.id, 'Edit Player'):
         this.getFormData(null, 'Add Player');
    }
    getFormData(playerId, type){
        if(playerId){
            async.parallel([
            (callback) => {
                this.fetchPlayers(callback, playerId)
            }
            ], (err, results) => {
                console.log(results);
                this.setFormFields(...results, playerId, type)
            })
        }
        
        this.setState({
            formType: type,
            playerId
        })
    }
    submitForm(e){
       
         e.preventDefault();
         console.log('hshsjs', this.state.formdata)
        const dataToSubmit = Helper.validateForm(this.state.formdata);
        if(!dataToSubmit.isValid){
            return this.setState({
                formError: true
            })
        }
        console.log('heree', this.state.formType)
        if(this.state.formType === 'Edit Player'){
            firebaseDB.ref(`players/${this.state.playerId}`)
                .update(dataToSubmit.record).then(() => {
                    this.setState({
                        formSuccess: `Update Successful`
                    })
                    setTimeout(() =>{
                        this.props.history.push('/players');
                    }, 2000);
                })
        }else{
            firebasePlayers.push(dataToSubmit.record)
                .then(() => {
                    this.setState({
                        formSuccess: `Added Successful`
                    })
                    setTimeout(() => {
                        this.props.history.push('/players');
                    },2000)
                })
        }
    }
    setFormFields(playerDetail, playerId, type){
        const newFormData = {...this.state.formdata}
        for(let key in newFormData){
            newFormData[key].value = playerDetail[key];
            newFormData[key].valid = true
        }
        firebase
        .storage()
        .ref('players')
        .child(playerDetail.image)
        .getDownloadURL()
        .then(url => {
            this.setState({
                formType:type,
                formdata: {...newFormData},
                playerId,
                defaultImg: url
            })
        });
        
    }
    fetchPlayers(callback, id){
        firebaseDB.ref(`players/${id}`).once('value')
            .then(snapshot => {
                callback(null, snapshot.val());
            })
    }
    onChange(event = '' , id, content){
        let formDetails = {};
        if(event){
             formDetails = Helper.onChange(this.state.formdata, id, event.target.value, content)
        }else{
             formDetails = Helper.onChange(this.state.formdata, id, '', content)
        }
            
        this.setState({
            formdata: {...this.state.formdata,  [id]: {...formDetails}},
            formError: false,
            formSuccess: ''
        })
    }
    displayMessage(){
        return (
            ((this.state.formError ? <div className="error_label">Something went wrong, try again</div> :
             ((this.state.formSuccess !== '' ) ? <div className="success_label">{this.state.formSuccess}</div> : null)))
        )
    }
    render() {
        return (
            <AdminLayout activeLink={'Add Players'}>
                <div className="editplayers_dialog_wrapper">
                    <h2>{this.state.formType}</h2>
                    <form>
                    <div className="label_inputs">{this.state.formdata.image.label}</div>
                        <div className="image_preview_wrapper">
                            <div className="image_preview_container">
                                
                                <div
                                    className="image_preview"
                                    style={{
                                        background: `url(${
                                            this.state.defaultImg ? 
                                            this.state.defaultImg : avatar
                                        })`
                                    }}
                                
                                >
                                  <div className="image-loading">
                                        {this.state.formdata.image.isLoading ? 
                                        <CircularProgress 
                                            thickness={7} style={{color:'#98c5e9'}}
                                            variant="determinate"
                                            value={this.state.formdata.image.percentageLoaded}
                                         />
                                         : null }
                                    </div>      
                                </div>
                            </div>
                            <div className="upload_action">
                                <Fileuploader 
                                    dir={'players'}
                                    tag={'Player Image'}
                                    accept={'image/*'}
                                    resetInput={this.resetImage}
                                    randomizeFilename
                                    id={'image'}
                                    name={'image'}
                                    defaultImg={this.state.defaultImg}
                                    defaultImgName={this.state.formdata.image.value}
                                    style={{
                                        position: 'relative',
                                        top: '50%',
                                        marginLeft: '10px'}}
                                    
                                    onProgress={this.onProgress}
                                    onUploadSuccess={this.onUploadSuccess}
                                    onUploadError={this.onUploadError}
                                    onUploadStart={this.onUploadStart}
                                    onReset={this.onReset}
                                />
                            </div>
                            

                        </div>
                        <FormField 
                                formdata={this.state.formdata.name} id={"name"}
                                onChange={ (event) => this.onChange(event, 'name')}
                        />
                        <FormField 
                                formdata={this.state.formdata.lastname} id={"lastname"}
                                onChange={ (event) => this.onChange(event, 'lastname')}
                        />
                        <FormField 
                                formdata={this.state.formdata.number} id={"number"}
                                onChange={ (event) => this.onChange(event, 'number')}
                        />
                        <FormField 
                                formdata={this.state.formdata.position} id={"position"}
                                onChange={ (event) => this.onChange(event, 'position')}
                        />
                        {this.displayMessage()}
                        <div className="admin_submit">
                            <button onClick={this.submitForm}>{this.state.formType}</button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditPlayer;