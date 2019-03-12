import React, { Component } from 'react';
import _ from 'lodash';
import AdminLayout from '../../HOC/AdminLayout';
import { firebasePlayers } from '../../../Firebase'
import { CircularProgress  } from '@material-ui/core';

import TableView from './TableView';


class Players extends Component {
    state = {
        loading: true,
        players: []
    }
    componentDidMount(){
        firebasePlayers.once('value').then(snapshot => {
            const players = _.map(snapshot.val(), (val, uid) => {
                return {...val, uid}
            })
            
            this.setState({
                players: players.reverse(),
                loading: false
            })
            console.log('players', this.state)
        })
    }
    renderLoadingIcon(){
       return this.state.loading ? <CircularProgress thickness={7} style={{color:'#98c5e9'}} /> : null
    }
    renderTable(){
        return this.state.players.length > 0 ? <TableView players={this.state.players} /> : null;
    }
    render() {
        return (
            <AdminLayout activeLink={'Player'}>
                <div className="admin_progress">
                    {this.renderLoadingIcon()}
                    {this.renderTable()}
                </div>
            </AdminLayout>
        );
    }
}

export default Players;