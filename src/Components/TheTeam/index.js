import React, { Component } from 'react';
import stripe from '../../Resources/images/stripes.png';
import { Fade } from 'react-reveal';
import {PlayerCard} from '../Common';
import { CircularProgress  } from '@material-ui/core';
import { firebasePlayers, firebase } from '../../Firebase';
import _ from 'lodash';
import async from 'async';

class TheTeam extends Component {
    state={
        isLoading: true,
        players:[]
    }
    componentDidMount(){
        firebasePlayers.once('value').then(snapshot => {
            const players = _.map(snapshot.val(), (val, uid) => {
                return {...val, uid}
            })
            return players.length > 0 ? this.getImageUrls(players) : null
        })
    }
    getImageUrls(players){
        let AsyncFncs = []
        players.forEach(player => {
            AsyncFncs.push(
                function(callback){
                    firebase
                    .storage()
                    .ref('players')
                    .child(player.image)
                    .getDownloadURL()
                    .then(url => {
                        callback(null, {...player, url})
                    })
                    .catch(e => {})
                }
            )
        });
        async.parallel(AsyncFncs, (error, results) => {
            this.setState({
                players: results,
                isLoading: false,
            })
        })
        
    }
    showPlayersByCategory(category){
       return this.state.players.map((player, i) => {
            if(player.position === category){
                return (
                    <Fade left delay={i * 20} key={i}>
                        <div className="card">
                            <PlayerCard
                                number={player.number}
                                name={player.name}
                                lastname={player.lastname}
                                background={player.url}
                            />
                        </div>
                    </Fade>
                )
            }
            return null
        })
    }
    render() {
        return (
            <div className="the_team_container"
                style={{
                    background:`url(${stripe}) repeat`
                }}
            >
                {this.state.isLoading ? <div className="loading">
                    <CircularProgress 
                           thickness={7} style={{color:'#98c5e9'}} 
                    /></div> : 
                        <div>
                            <div className="team_category_wrapper">
                            <div className="title">
                                Keepers
                            </div>
                            <div className="team_cards">
                                {this.showPlayersByCategory('Keeper')}
                            </div>
                        </div>
                        <div className="team_category_wrapper">
                            <div className="title">
                                Defence
                            </div>
                            <div className="team_cards">
                                {this.showPlayersByCategory('Defence')}
                            </div>
                        </div>
                        <div className="team_category_wrapper">
                            <div className="title">
                                MidField
                            </div>
                            <div className="team_cards">
                                {this.showPlayersByCategory('Midfield')}
                            </div>
                        </div>
                        <div className="team_category_wrapper">
                            <div className="title">
                                Strikers
                            </div>
                            <div className="team_cards">
                                {this.showPlayersByCategory('Striker')}
                            </div>
                        </div>
                    </div>
                
                }
                
            </div>
        );
    }
}

export default TheTeam;