import React, { Component } from 'react';
import MeetPlayersTag from './MeetPlayersTag';
import Stripes from '../../../Resources/images/stripes.png';
import { Reveal } from 'react-reveal';
import Card from './Card';

class MeetPlayers extends Component {
    state = {
        show: false
    }
    render() {
        return (
            <Reveal
                fraction={0.7}
                onReveal={() => this.setState({ show: true})}
            >
                <div className="home_meetplayers"
                    style={{
                        background: `#fff url(${Stripes})`
                    }}
                >
                    <div className="container">
                        <div className="home_meetplayers_wrapper">
                            <div className="home_card_wrapper">
                                <Card show={this.state.show}/>
                            </div>
                            <div className="home_text_wrapper">
                                <MeetPlayersTag />
                            </div>
                        </div>

                    </div>
                </div>
            </Reveal>
        );
    }
}

export default MeetPlayers;