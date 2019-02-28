import React, { Component } from 'react';
import { firebase } from '../../Firebase';
import { FormField } from '../Common';
import Helper from '../../Helper';

class SignIn extends Component {
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
            },
            password:{
                element: 'input',
                value: '',
                config:{
                    name:'password_input',
                    type:'password',
                    placeholder:'password'
                },
                validation:{
                    required: true,
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
    submitForm(e){
        e.preventDefault();
        const dataToSubmit = Helper.validateForm(this.state.formdata);
        if(!dataToSubmit.isValid){
            return this.setState({
                formError: true
            })
        }
        console.log(dataToSubmit);
        this.authenticateUserThenLogIn(dataToSubmit.record)
    }
    authenticateUserThenLogIn(user){
        firebase.auth().signInWithEmailAndPassword(user.email,user.password)
            .then(() => {
                this.props.history.push('/dashboard');
            })
            .catch(() => {
                this.setState({
                    formError: true
                })
            })
    }
    displayMessage(){
        return (
            ((this.state.formError ? <div className="error_label">Something went wrong, try again</div> :
             ((this.state.formSuccess !== '' ) ? <div className="success_label">{this.state.formSuccess}</div> : null)))
        )
    }
    onChange(event, id){
        const formDetails = Helper.onChange(this.state.formdata, id, event.target.value);
        this.setState({
            formdata: {...this.state.formdata,  [id]: {...formDetails}},
            formError: false,
            formSuccess: ''
        })
    }
    render() {
        return (
            <div className="container" >
                <div className="signin_wrapper" style={{margin:'100px'}}>
                    <form onSubmit={this.submitForm}  noValidate>
                        <h2>Please Login</h2>
                        <FormField 
                            formdata={this.state.formdata.email} id={"email"}
                            onChange={ (event) => this.onChange(event, 'email')}
                        />
                        <FormField 
                            formdata={this.state.formdata.password} id={"password"}
                            onChange={ (event) => this.onChange(event, 'password')}
                        />
                        {this.displayMessage()}
                        <button onClick={this.onSubmit}>Log in</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;