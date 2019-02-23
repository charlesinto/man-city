import React, { Component } from 'react';
import Blocks from './Blocks';
import { Tag } from '../../Common';

class Matches extends Component {
    render() {
        return (
            <div className="home_matches_wrapper">
                <div className="container">
                    <Tag
                        style={{
                            backgroundColor:'#0e1731',
                            fontSize:'50px',
                            color:'#fff'
                        }}
                    >
                        Matches
                    </Tag>
                    <Blocks />
                    <Tag
                        link={'/the_team'}
                        style={{
                            backgroundColor:'#fff',
                            fontSize:'22px',
                            color:'#0e1731'
                        }}
                    >
                        see more matches
                    </Tag>
                </div>
            </div>
        );
    }
}

export default Matches;