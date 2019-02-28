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
        this.submitForm = this.submitForm.bind(this);
    }
    onChange(event, id){
        const formDetails = Helper.onChange(this.state.formdata, id, event.target.value);
        this.setState({
            formdata: {...this.state.formdata,  [id]: {...formDetails}},
            formError: false,
            formSuccess: ''
        })

    }
    submitForm(e){
        e.preventDefault();
        const objectToSubmit = Helper.validateForm(this.state.formdata);
        if(!objectToSubmit.isValid){
            return this.setState({
                formError: true
            })
        }
        this.checkIfDataExists(objectToSubmit.record);
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
                                onChange={ (event) => this.onChange(event, 'email')}
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