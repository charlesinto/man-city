import React from 'react';
import { Tag } from '../../Common'
const MeetPlayersTag = () => {
    return (
        <div>
            <div>
                <Tag
                    style={{
                        background:'#0e1731',
                        fontSize:'100px',
                        color:'#fff',
                        display:'inline-block',
                        marginBottom:'20px'
                    }}
                >
                    Meet
                </Tag>
            </div>
            <div>
                <Tag
                    style={{
                        background:'#0e1731',
                        fontSize:'100px',
                        color:'#fff',
                        display:'inline-block',
                        marginBottom:'20px'
                    }}
                >
                    The
                </Tag>
            </div>
            <div>
                <Tag
                    style={{
                        background:'#0e1731',
                        fontSize:'100px',
                        color:'#fff',
                        display:'inline-block',
                        marginBottom:'20px'
                    }}
                >
                    Players
                </Tag>
            </div>
            <div>
                <Tag
                    style={{
                        background:'#fff',
                        fontSize:'27px',
                        color:'#0e1731',
                        display:'inline-block',
                        marginBottom:'20px',
                        border: '1px solid #0e1731'
                    }}
                    link={'/the_team'}
                >
                    meet them here
                </Tag>
            </div>
        </div>
        
    );
};

export default MeetPlayersTag;