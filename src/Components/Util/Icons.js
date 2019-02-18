import React from 'react';
import  { Link } from 'react-router-dom';

import mCityLogo from '../../Resources/images/logos/manchester_city_logo.png'

export const CityLogo = (props) => {
    const { width, height, link} = props;
    const Template = <div className="img_cover"style={{width,height,background:`url(${mCityLogo}) no-repeat` }}></div>

    if(props.link){
       return  (<Link to={link} className="link_logo">
                    {Template}
            </Link>)
    }else{
        return Template;
    }
}
