import React, { Component } from 'react';

import Layout from './Components/HOC/Layout';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
class Routes extends Component{
    render(){
        return(
            <div>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </Layout>
            </div>
        )
    }
}

export default Routes;
