import React, { Component} from 'react';
import AdminLayout from '../../HOC/AdminLayout';
import {FormField} from '../../Common/FormField';
import async from 'async';
import _ from 'lodash';
import Helper from '../../../Helper';
import { firebaseDB, firebaseMatches, firebaseTeams} from '../../../Firebase';

class EditMatch extends Component{
    state = {
        matchId:'',
        formType:'',
        formError: false,
        formSuccess: '',
        team:[],
        formdata:{
            date:{
                element: 'input',
                value: '',
                config:{
                    name:'date_input',
                    type:'date',
                    placeholder:'enter date',
                    label: 'Event Date'
                },
                validation:{
                    required: true,
                },
                valid: true,
                validationMessage:'',
                showLabel: true
            },
            local:{
                element: 'select',
                value: '',
                config:{
                    name:'local_input',
                    type:'select',
                    placeholder:'Select one',
                    label: 'Local',
                    options:[]
                },
                validation:{
                    required: true,
                },
                valid: true,
                validationMessage:'',
                showLabel: false
            },
            resultLocal:{
                element: 'input',
                value: '',
                config:{
                    name:'result_local_input',
                    type:'text',
                    placeholder:'',
                    label: 'Local',
                    options:[]
                },
                validation:{
                    required: true,
                },
                valid: true,
                validationMessage:'',
                showLabel: false
            },
            away:{
                element: 'select',
                value: '',
                config:{
                    name:'away_input',
                    type:'select',
                    placeholder:'Select one',
                    label: 'Away',
                    options:[]
                },
                validation:{
                    required: true,
                },
                valid: true,
                validationMessage:'',
                showLabel: false
            },
            resultAway:{
                element: 'input',
                value: '',
                config:{
                    name:'result_away_input',
                    type:'text',
                    placeholder:'',
                    label: 'Local',
                    options:[]
                },
                validation:{
                    required: true,
                },
                valid: true,
                validationMessage:'',
                showLabel: false
            },
            referee:{
                element: 'input',
                value: '',
                config:{
                    name:'referee_input',
                    type:'text',
                    placeholder:'',
                    label: 'Referee',
                },
                validation:{
                    required: true,
                },
                valid: true,
                validationMessage:'',
                showLabel: true
            },
            stadium:{
                element: 'input',
                value: '',
                config:{
                    name:'stadium_input',
                    type:'text',
                    placeholder:'',
                    label: 'Stadium',
                },
                validation:{
                    required: true,
                },
                valid: true,
                validationMessage:'',
                showLabel: true
            },
            result:{
                element: 'select',
                value: '',
                config:{
                    name:'result_input',
                    type:'select',
                    placeholder:'',
                    label: 'Result',
                    options:[{key:'W', value:'W'}, {key:'L', value:'L'},
                     {key:'D', value:'D'}, {key:'n/a', value:'n/a'}]
                },
                validation:{
                    required: true,
                },
                valid: true,
                validationMessage:'',
                showLabel: true
            },
            final:{
                element: 'select',
                value: '',
                config:{
                    name:'final_input',
                    type:'select',
                    placeholder:'',
                    label: 'Final',
                    options:[{key:'Yes', value:'Yes'}, {key:'No', value:'No'}]
                },
                validation:{
                    required: true,
                },
                valid: true,
                validationMessage:'',
                showLabel: true
            },

        }
    }
    constructor(){
        super();
        this.submitForm = this.submitForm.bind(this);
    }
    componentDidMount(){
        this.props.match.params.id ? this.getFormData(this.props.match.params.id, 'Edit Match'):
         this.getFormData(null, 'Add Match');
    }
    getFormData(matchId, type){
        async.parallel([
            function(callback) {
                firebaseDB.ref(`matches/${matchId}`).once('value')
                    .then(snapshot => {
                        callback(null, snapshot.val())
                    })
            },  
            function(callback) {
                firebaseTeams.once('value')
                .then(snapshot => {
                    const teams = _.map(snapshot.val(), (value, uid) => {
                        return {...value, uid}
                    });
                    callback(null, teams)
                })
            } 
        ], (err, results) => {
            console.log(results);
            console.log('eroror0', err)
            this.setFormFields(...results, matchId, type)
        })
    }
    submitForm(e){
         e.preventDefault();
        const dataToSubmit = Helper.validateForm(this.state.formdata);
        if(!dataToSubmit.isValid){
            return this.setState({
                formError: true
            })
        }
        this.state.team.forEach( team => {
            if(team.shortName === dataToSubmit.record.local){
                dataToSubmit.record['localThmb'] = team.thmb
            }
            if(team.shortName === dataToSubmit.record.away){
                dataToSubmit.record['awayThmb'] = team.thmb
            }
        })
        if(this.state.formType === 'Edit Match'){
            firebaseDB.ref(`matches/${this.state.matchId}`)
                .update(dataToSubmit.record).then(() => {
                    this.setState({
                        formSuccess: `Update Successful`
                    })
                    setTimeout(() => {
                        this.setState({
                        formSuccess: ``
                    })
                    }, 2000);
                })
        }else{
            firebaseMatches.push(dataToSubmit.record)
                .then(() => {
                    this.setState({
                        formSuccess: `Added Successful`
                    })
                    setTimeout(() => {
                        this.props.history.push('/admin_matches');
                    },2000)
                })
        }
    }
    setFormFields(match, team, matchId, type){
        console.log(match)
        const newFormData = {...this.state.formdata}
        const teamOptions = []
        team.map((item) => (
            teamOptions.push({key: item.shortName, value: item.shortName})
        ))
        for(let key in newFormData){
            if(match){
                newFormData[key].value = match[key]
                newFormData[key].valid = true;
            }
            if(key === 'away' || key === 'local'){
                newFormData[key].config.options = teamOptions;
            }
            
        }
        this.setState({
            formType:type,
            formdata: {...newFormData},
            matchId,
            team
        })
    }
    fetchMatches(callback, id){
        firebaseDB.ref(`matches/${id}`).once('value')
            .then(snapshot => {
                const match = _.map(snapshot.val(), (value, uid) => {
                    return {...value, uid}
                });
                callback(null, match)
            })
    }
    showForm(){
        this.setState({
            formType: 'Add Match'
        })
    }
    onChange(event, id){
        const formDetails = Helper.onChange(this.state.formdata, id, event.target.value);
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
    render(){
        
        return (
            <AdminLayout activeLink={'Add Matches'} matches={this.props.match}>
                <div className="editmatch_dialog_wrapper">
                    <h2>{this.state.formType}</h2>
                    <form onSubmit={this.submitForm} noValidate>
                        <FormField 
                            formdata={this.state.formdata.date} id={"date"}
                            onChange={ (event) => this.onChange(event, 'date')}
                        />
                        <div className="select_team_layout">
                            <div className="label_inputs">
                                Local
                            </div>
                            <div className="wrapper">
                                <div className="left">
                                    <FormField 
                                        formdata={this.state.formdata.local} id={"local"}
                                        onChange={ (event) => this.onChange(event, 'local')}
                                    />
                                </div>
                                <div>
                                    <FormField 
                                        formdata={this.state.formdata.resultLocal} id={"resultLocal"}
                                        onChange={ (event) => this.onChange(event, 'resultLocal')}
                                    />
                                </div>
                            </div>
                            <div className="label_inputs">
                                Away
                            </div>
                            <div className="wrapper">
                                <div className="left">
                                    <FormField 
                                        formdata={this.state.formdata.away} id={"away"}
                                        onChange={ (event) => this.onChange(event, 'away')}
                                    />
                                </div>
                                <div>
                                    <FormField 
                                        formdata={this.state.formdata.resultAway} id={"resultAway"}
                                        onChange={ (event) => this.onChange(event, 'resultAway')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="split_fieds">
                            <FormField 
                                formdata={this.state.formdata.referee} id={"referee"}
                                onChange={ (event) => this.onChange(event, 'referee')}
                            />
                            <FormField 
                                formdata={this.state.formdata.stadium} id={"stadium"}
                                onChange={ (event) => this.onChange(event, 'stadium')}
                            />
                        </div>
                        <div className="split_fields last">
                            <FormField 
                                    formdata={this.state.formdata.result} id={"result"}
                                    onChange={ (event) => this.onChange(event, 'result')}
                                />
                            <FormField 
                                formdata={this.state.formdata.final} id={"final"}
                                onChange={ (event) => this.onChange(event, 'final')}
                            />
                        </div>
                        {this.displayMessage()}
                        <div className="admin_submit">
                            <button onClick={this.submitForm}>{this.state.formType}</button>
                        </div>
                    </form>
                </div>
                
            </AdminLayout>
        )
    }
}

export default EditMatch;