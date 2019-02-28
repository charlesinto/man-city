import React, { Component } from 'react';

import Layout from './Components/HOC/Layout';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Dashboard'

class Routes extends Component{
    render(){
        return(
            <div>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/sign_in" component={SignIn} />
                        <Route exact path="/dashboard" component={Dashboard} />
                    </Switch>
                </Layout>
            </div>
        )
    }
}

export default Routes;
