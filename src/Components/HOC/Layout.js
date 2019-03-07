import React from 'react';
import Header from '../Header_Footer/Header';
import Footer from '../Header_Footer/Footer';


const Layout = (props) => {
    return (
        <div style={{positon: "relative"}}>
            <Header />
            {props.children}

            <Footer />
        </div>
    )
}

export default Layout;
