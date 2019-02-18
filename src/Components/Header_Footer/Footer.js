import React from 'react';
import { CityLogo } from '../Util/Icons';

const Footer = () => {
    return (
        <footer className="bck_blue">
            <div className="footer_logo">
                <CityLogo 
                    width="70px"
                    height="70px"
                    link="/"
                />
            </div>
            <div className="footer_discl">
                Manchester city. All right reserved
            </div>
        </footer>
    )
}

export default Footer;