import React, { Component } from 'react';
import PromotionAnimation from './PromotionAnimation'
import Enroll from './Enroll';

class Promotion extends Component {
    render() {
        return (
            <div className="promotion_wrapper"
                style={{
                    background:'#fff'
                }}
            >

                <div className="container"> 
                    <PromotionAnimation />
                    <Enroll />
                </div>
            </div>
            
        );
    }
}

export default Promotion;