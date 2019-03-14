import React, { Component } from 'react';
import { NodeGroup } from 'react-move'
import { easePolyOut } from 'd3-ease';

class Match extends Component {
    state = {
        match: []
    }
    static getDerivedStateFromProps(props, state){
        if(props.matches){
            return {
                match: props.matches
            }
        }
        return state
    }
    render() {
        console.log('matches', this.state)
        return (
            <NodeGroup
                data={this.state.match}
                keyAccessor={(d) => d.uid}

                start={(d, i) => ({
                    x:0,
                    opacity: -200,
                    timing: { duration: 500,delay:i * 100, ease: easePolyOut }

                })}

                enter={(d, i) => ({
                    x:[0],
                    opacity:[1],
                    timing: { duration: 500,delay:i * 100, ease: easePolyOut }
                })}
                update={(d, i)=>({
                        x:[0],
                        opacity:[1],
                        timing: { duration: 500,delay:i * 100, ease: easePolyOut }
                    })}
                leave={(d, i)=>({
                    x:[-200],
                    opacity:[0],
                    timing: { duration: 500,delay:i * 100, ease: easePolyOut }
                })}
            >
                {
                    (nodes) => (
                        <div>
                           { 
                               nodes.map(({data, key, state: {x, opacity}}) => (
                                <div key={key} className="match_box_big"
                                    style={{
                                        opacity,
                                        transform:`translate(${x}px)`
                                    }}
                                >
                                    <div className="block_wraper">
                                        <div className="block">
                                            <div className="icon"
                                                style={{
                                                    background:`url(/images/team_icons/${data.localThmb}.png)`
                                                }}></div>
                                            <div className="team">{data.local}</div>
                                            <div className="result"> {data.resultLocal}</div>
                                        </div>
                                        <div className="block">
                                            <div className="icon"
                                                style={{
                                                    background:`url(/images/team_icons/${data.awayThmb}.png)`
                                                }}></div>
                                            <div className="team">{data.away}</div>
                                            <div className="result"> {data.resultAway}</div>
                                        </div>


                                    </div>
                                    <div className="block_wraper nfo">
                                            <div ><strong>Date</strong> {data.date}</div>
                                            <div ><strong>Stadium</strong> {data.stadium}</div>
                                            <div><strong>Referee</strong> {data.referee}</div>
                                    </div>
                                </div>
                                ))
                        }
                        </div>
                        
                    )
                }

            </NodeGroup>
        );
    }
}

export default Match;