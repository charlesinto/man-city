import React, { Component} from 'react';
import _ from 'lodash';
import AdminLayout from '../../HOC/AdminLayout';
import { firebaseMatches } from '../../../Firebase'
import { CircularProgress  } from '@material-ui/core';

import TableView from './TableView';

class AdminMatches extends Component{
    state = {
        loading: true,
        matches: []
    }
    componentDidMount(){
        firebaseMatches.once('value').then(snapshot => {
            const matches = _.map(snapshot.val(), (val, uid) => {
                return {...val, uid}
            })
            
            this.setState({
                matches: matches.reverse(),
                loading: false
            })
            console.log('matches', this.state)
        })
    }
    renderLoadingIcon(){
       return this.state.loading ? <CircularProgress thickness={7} style={{color:'#98c5e9'}} /> : null
    }
    renderTable(){
        return this.state.matches.length > 0 ? <TableView matches={this.state.matches} /> : null;
    }
    render(){
        return (
            <AdminLayout activeLink={'Matches'}>
                <div className="admin_progress">
                    {this.renderLoadingIcon()}
                    {this.renderTable()}
                </div>
            </AdminLayout>
        )
    }
}

export default AdminMatches;