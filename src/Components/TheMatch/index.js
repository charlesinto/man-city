import React, { Component } from 'react';
import LeagueTable from './League';
import { firebaseMatches } from '../../Firebase';
import _ from 'lodash';
import Match from './Match';

class TheMatch extends Component {
    state = {
        matches:[],
        filteredMatches:[],
        gamePlayed: 'All',
        gameResult:'All'
    }
    componentDidMount(){
        firebaseMatches.once('value').then(snapshot => {
            const matches = _.map(snapshot.val(), (val, uid) => {
                return {...val, uid}
            })
            this.setState({
                matches: matches.reverse(),
                filteredMatches: matches.reverse()
            })
        })
    }
    filterGamesByStat(type, stats){
        if(type === 'games'){
            switch(stats){
                case 'All':
                    this.setState({
                        gamePlayed:'All',
                        filteredMatches: this.state.matches
                    })
                break;
                case 'Yes':
                    if(this.state.gameResult !== 'All'){
                        const matches = this.state.matches.filter((element)=> (
                            element.final === stats && element.result === this.state.gameResult
                        ))
                        this.setState({
                            filteredMatches:matches,
                            gamePlayed:stats,
                            
                        })
                    }
                        else{
                            const matches = this.state.matches.filter((element)=> (
                                element.final === stats
                            ))
                            this.setState({
                                filteredMatches:matches,
                                gamePlayed:stats
                            })
                        }
                    
                break;

                case 'No':
                    if(this.state.gameResult !== 'All'){
                        const matches = this.state.matches.filter((element)=> (
                            element.final === stats && element.result === this.state.gameResult
                        ))
                        this.setState({
                            filteredMatches:matches,
                            gamePlayed:stats
                        })
                    }else{
                        const matches = this.state.matches.filter((element)=> (
                            element.final === stats
                        ))
                        this.setState({
                            filteredMatches:matches,
                            gamePlayed:stats
                        })
                    }
                break;
                default:
                break
            }
        }
        else if(type === 'results'){
            switch(stats){
                case 'All':
                    this.setState({
                        gameResult:'All',
                        filteredMatches: this.state.matches
                    })
                break;
                case 'W':
                    if(this.state.gamePlayed !== 'All'){
                        const matches = this.state.matches.filter((element)=> (
                            element.final === this.state.gamePlayed && element.result === stats
                        ))
                        this.setState({
                            filteredMatches:matches,
                            gameResult:stats
                        })
                    }else{
                        const matches = this.state.matches.filter((element)=> (
                            element.result === stats
                        ))
                        this.setState({
                            filteredMatches:matches,
                            gameResult:stats
                        })
                    }
                break;

                case 'D':
                    if(this.state.gamePlayed !== 'All'){
                        const matches = this.state.matches.filter((element)=> (
                            element.final === this.state.gamePlayed && element.result === stats
                        ))
                        this.setState({
                            filteredMatches:matches,
                            gameResult:stats
                        })
                    }else{
                        const matches = this.state.matches.filter((element)=> (
                            element.result === stats
                        ))
                        this.setState({
                            filteredMatches:matches,
                            gameResult:stats
                        })
                    }
                break;
                case 'L':
                    if(this.state.gamePlayed !== 'All'){
                        const matches = this.state.matches.filter((element)=> (
                            element.final === this.state.gamePlayed && element.result === stats
                        ))
                        this.setState({
                            filteredMatches:matches,
                            gameResult:stats
                        })
                    }else{
                        const matches = this.state.matches.filter((element)=> (
                            element.result === stats
                        ))
                        this.setState({
                            filteredMatches:matches,
                            gameResult:stats
                        })
                    }
                break;
                default:
                break
            }
        }
    }
    render() {
        console.log('this.ma', this.state.filteredMatches)
        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
        
                    <div className="left">
                        <div className="match_filters">
                            <div className="match_filters_box">
                                <div className="tag">
                                    Show Match
                                </div>
                                <div className="cont">
                                    <div className={`option ${this.state.gamePlayed === 'All' ? 'active' : ''}`}
                                        onClick={() => this.filterGamesByStat('games','All')}
                                    >
                                        All
                                    </div>
                                    <div className={`option ${this.state.gamePlayed === 'Yes' ? 'active' : ''}`}
                                        onClick={() => this.filterGamesByStat('games','Yes')}
                                    >
                                        Played
                                    </div>
                                    <div className={`option ${this.state.gamePlayed === 'No' ? 'active' : ''}`}
                                        onClick={() => this.filterGamesByStat('games','No')}
                                    >
                                        Not Played
                                    </div>
                                </div>
                            </div>
                            <div className="match_filters_box">
                                <div className="tag">
                                    Show Result
                                </div>
                                <div className="cont">
                                    <div className={`option ${this.state.gameResult === 'All' ? 'active' : ''}`}
                                        onClick={() => this.filterGamesByStat('results','All')}
                                    >
                                        All
                                    </div>
                                    <div className={`option ${this.state.gameResult === 'W' ? 'active' : ''}`}
                                        onClick={() => this.filterGamesByStat('results','W')}
                                    >
                                        W
                                    </div>
                                    <div className={`option ${this.state.gameResult === 'D' ? 'active' : ''}`}
                                        onClick={() => this.filterGamesByStat('results','D')}
                                    >
                                        D
                                    </div>
                                    <div className={`option ${this.state.gameResult === 'L' ? 'active' : ''}`}
                                        onClick={() => this.filterGamesByStat('results','L')}
                                    >
                                        L
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Match matches={this.state.filteredMatches}/>
                    </div>
                    <div className="right">
                        <LeagueTable/>
                    </div>
                </div>
            </div>
        );
    }
}

export default TheMatch;