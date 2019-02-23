import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = ({children, style, link}) => {
    const template = <div style={{
                        padding:'5px 10px',
                        display:'inline-block',
                        fontFamily:'Righteous',
                        ...style
                    }}> {children}</div>
    if(link){
        return (
            <Link to={link}>
                {template}
            </Link>
        )
    }
        return template;
};
 