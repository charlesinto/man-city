import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';
import featured_player from '../../../Resources/images/featured_player.png';

class Text extends Component {
    animateNumber(){
        const width = window.innerWidth/4;
        return (
            <Animate
                show={true}
                start={{
                    opacity:0,
                    rotate: 0,
                }}
                enter={{
                    opacity: [1],
                    rotate:[360],
                    timing:{ duration: 500, delay:200, ease: easePolyOut}
                }}

            >
                {({opacity, rotate}) => (
                    <div className="featured_number"
                        style={{
                            opacity,
                            transform:`translate(${width}px, calc(50% - ${94}px)) rotateY(${rotate}deg)`

                        }}
                    >
                        3
                    </div>
                )}

            </Animate>
        )
    }
    animateFirst(){
        const fullWidth = window.innerWidth;
        const fullHeight = window.innerHeight;
        const height = (fullHeight /2) + 10;
        const width = fullWidth/4;
        return (
            <Animate
                show={true}
                start={{
                    opacity:0,
                    x:fullWidth,
                    y: height
                }}
                enter={{
                    opacity: [1],
                    timing:{ duration: 500, delay:700, ease: easePolyOut},
                    x: [width],
                    y: [292]
                }}

            >
                {({opacity, x, y}) => (
                    <div className="featured_first"
                        style={{
                            opacity,
                            transform:`translate(${x}px, calc(50% + ${y}px))`,

                        }}
                    >
                        League
                    </div>
                )}

            </Animate>
        )
    }
    animatePlayer(){
        const fullWidth = window.innerWidth;
        const fullHeight = window.innerHeight;
        const height = (fullHeight /2) - 270;
        const width = fullWidth/2 ;
        return (
            <Animate
                show={true}
                start={{
                    opacity:0,
                    x:fullWidth,
                    y: height
                }}
                enter={{
                    opacity: [1],
                    timing:{ duration: 500, delay:800, ease: easePolyOut},
                    x: [width],
                    y: [240]
                }}

            >
                {({opacity, x, y}) => (
                    <div className="featured_player"
                        style={{
                            opacity,
                            transform:`translate(${width}px, calc(50% - ${y}px))`,
                            background: `url(${featured_player})`
                        }}
                    >
                    </div>
                )}

            </Animate>
        )
    }
    animateSecond(){
        const fullWidth = window.innerWidth;
        const fullHeight = window.innerHeight;
        const height = (fullHeight /2) + 130;
        const width = fullWidth/4;
        return (
            <Animate
                show={true}
                start={{
                    opacity:0,
                    x:fullWidth,
                    y: height
                }}
                enter={{
                    opacity: [1],
                    timing:{ duration: 500, delay:800, ease: easePolyOut},
                    x: [width],
                    y: [412]
                }}

            >
                {({opacity, x, y}) => (
                    <div className="featured_second"
                        style={{
                            opacity,
                            transform:`translate(${x}px, calc(50% + ${y}px))`,

                        }}
                    >
                        championship
                    </div>
                )}

            </Animate>
        )
    }
    render() {
        return (
            <div className="featured_text">
                
                {this.animatePlayer()}
                {this.animateNumber()}
                {this.animateFirst()}
                {this.animateSecond()}

            </div>
        );
    }
}

export default Text;