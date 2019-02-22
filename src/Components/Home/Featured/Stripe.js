import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';

class Stripe extends Component{
    
    state = {
        stripes: [
            {
                background:'#98c5e9',
                left: 60,
                rotate: 25,
                top: -498,
                delay: 0,
            },
            {
                background:'#fff',
                left: 300,
                rotate: 25,
                top: -498,
                delay: 500,
            },
            {
                background:'#98c5e9',
                left: 540,
                rotate: 25,
                top: -498,
                delay: 1000,
            }
        ]
    }
    calculateWidth(){
        const windowWidth = window.innerWidth;
        const equalSpace = windowWidth / 4;
        this.setState({
            stripes: [
                {
                    background:'#98c5e9',
                    left: equalSpace,
                    rotate: 25,
                    top: -356,
                    delay: 0,
                },
                {
                    background:'#fff',
                    left: equalSpace + 120,
                    rotate: 25,
                    top: -356,
                    delay: 500,
                },
                {
                    background:'#98c5e9',
                    left: equalSpace + 240,
                    rotate: 25,
                    top: -356,
                    delay: 700,
                }
            ]
        })
    }
    componentDidMount(){
        window.addEventListener('resize', () => this.calculateWidth())
    }
    componentWillUnmount(){
        window.removeEventListener('resize');
    }
    componentWillMount(){
        this.calculateWidth();
    }
    showStripes(){
        console.log('called alos')
        return (
           this.state.stripes.map((stripe, i) => (
               <Animate
                    key={i}
                    show={true}
                    start={{
                        background:'#fff',
                        opacity: 0,
                        left:0,
                        rotate:0,
                        top: 0,
                    }}
                    enter={{
                        background:[stripe.background],
                        timing: {
                            delay: stripe.delay,
                            duration: 500,
                            ease: easePolyOut
                        },
                        opacity: [1],
                        left:[stripe.left],
                        rotate:[stripe.rotate],
                        top:[stripe.top]
                    }}
               >
                   {({ background, opacity, left, top, rotate }) => {
                       return (
                        <div
                            className="stripe"
                            style={{
                                background,
                                opacity,
                                transform:`rotate(${rotate}deg) translate(${left}px, ${top}px)`,
                            }}
                        >

                        </div>
                       )
                   }}
                </Animate>
           ))
        )
    }
    render(){
        return (
            <div className="featured_stripes">
                {this.showStripes()}
            </div>
        )
    }
}

export default Stripe;
