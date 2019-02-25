import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';

import { PlayerCard } from '../../Common';
import Otamendi from '../../../Resources/images/players/Otamendi.png'

class Card extends Component {
    state = {
        cssProps: [
            {
                left:`40%`,
                bottom:`20%`
            },
            {
                left:`30%`,
                bottom:`15%`
            },
            {
                left:`20%`,
                bottom:`5%`
            },
            {
                left:`10%`,
                bottom:`0%`
            }
        ]
    }
    showCards(){
        return (
            this.state.cssProps.map((card, i) => {
                return (
                    <Animate
                        key={i}
                        show={this.props.show}
                        start={{
                            left: 0,
                            bottom: 0
                        }}
                        enter={{
                            left:[card.left],
                            bottom:[card.bottom],
                            timing:{ duration: 500,delay:1000, ease: easePolyOut}
                        }}
                    >
                        {({bottom, left})=> {
                            return (
                                <div
                                    style={{
                                        position:'absolute',
                                        bottom,
                                        left
                                    }}
                                >
                                    <PlayerCard
                                        number={"31"}
                                        name={"Nicolas"}
                                        lastname={"Otamendi"}
                                        background={Otamendi}
                                    />
                                </div>
                            )
                        }}
                    </Animate>
                )
            })
        )
    }
    render() {
        return (
            <div>
                {this.showCards()} 
            </div>
        );
    }
}

export default Card;