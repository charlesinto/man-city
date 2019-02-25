import React, { Component } from 'react';
import { firebaseMatches } from '../../../Firebase';
import _ from 'lodash';
import { Slide } from 'react-reveal';

import { MatchBlock } from '../../Common';

class Blocks extends Component {
    state = {
        matches: []
    }
    componentDidMount(){
        firebaseMatches.limitToLast(6).once('value')
            .then((snapshot) => {
                console.log(snapshot.val());
                   const matches = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid}
                    
               })
               this.setState({
                   matches: matches.reverse()
               })
            });

    }
    showMatches(matches){
        return (
            matches.map((match, i) => {
                return (
                    <Slide bottom key={i}>
                        <div className="item">
                            <div className="wrapper">
                                <MatchBlock match={match} />
                            </div>
                        </div>
                    </Slide>
                )
            })
        )
    }
    render() {
        const { matches} = this.state;
        return (
            <div className="home_matches">
                {this.showMatches(matches)}
            </div>
        );
    }
}

export default Blocks;