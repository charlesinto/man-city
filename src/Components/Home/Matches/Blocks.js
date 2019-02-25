import React, { Component } from 'react';
import { firebaseMatches } from '../../../Firebase';
import _ from 'lodash';

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
    render() {
        console.log('state', this.state);
        return (
            <div>
                
            </div>
        );
    }
}

export default Blocks;