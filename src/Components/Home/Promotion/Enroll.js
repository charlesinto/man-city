import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import { FormField } from '../../Common';
import { firebasePromotions } from '../../../Firebase';
import Helper from '../../../Helper';

class Enroll extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formdata:{
            email:{
                element: 'input',
                value: '',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'enter your email'
                },
                validation:{
                    required: true,
                    email:true
                },
                valid: true,
                validationMessage:''
            }
        }
    }
    constructor(){
        super();
        this.submitForm = this.submitForm.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this);
    }
    onEmailChange(event){
        const formdata = {...this.state.formdata}
        const { email } = formdata;
        email.value = event.target.value;
        const validData = Helper.validate(email);
        email.valid = validData[0];
        email.validationMessage = validData[1];
        this.setState({
            formdata: {...formdata,  email: {...email}},
            formError: false,
            formSuccess: ''
        })
    }
    submitForm(e){
        e.preventDefault();
        let objectToSubmit = {};
        let formIsValid = null;
        const { formdata } = this.state;
        for(let key in formdata){
            objectToSubmit[key] = formdata[key].value;
            if(formIsValid === null){
                formIsValid = formdata[key].valid;
            }
            else if( formIsValid){
                formIsValid = formdata[key].valid
            }
            
        }
        if(!formIsValid){
            return this.setState({
                formError: true
            })
        }
        this.checkIfDataExists(objectToSubmit);
    }
    checkIfDataExists(record){
        firebasePromotions.orderByChild('email').equalTo(record.email)
            .once('value').then((snapshot) => {
                (snapshot.val() === null) ? 
                this.createNewRecord(record) : 
                this.resetForm(false)
            })
    }
    createNewRecord(record){
        firebasePromotions.push(record);
        this.resetForm(true)
    }
    resetForm(type){
        for(let key in this.state.formdata){
            let formField = {...this.state.formdata[key]}
            const newFormData = {...this.state.formdata,  [key]:
                {...formField, value: '', valid: false, validationMessage:''}};
            console.log('form', newFormData)
            this.setState({
                formdata: {...newFormData},
                formSuccess: type ? 'congratulations' : 'Record exists',
                formError: false
            })
        }
    }
    displayMessage(){
        return (
            ((this.state.formError ? <div className="error_label">Something went wrong, try again</div> :
             ((this.state.formSuccess !== '' ) ? <div className="success_label">{this.state.formSuccess}</div> : null)))
        )
    }
    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={this.submitForm} noValidate>
                        <div className="enroll_title">
                            Enter your email
                        </div>
                        <div className="enroll_input">
                            <FormField id="email_input"
                                formdata={this.state.formdata.email}
                                onChange={this.onEmailChange}
                            />
                            {this.displayMessage()}
                            <button onClick={this.onSubmit}>Enroll</button>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;