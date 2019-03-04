import React, { Component } from 'react';

import Layout from './Components/HOC/Layout';
import { Switch } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Admin';
import PrivateRoute from './Components/AuthRoutes/PrivateRoute';
import PublicRoute from './Components/AuthRoutes/PublicRoute'

class Routes extends Component{
    render(){
        return(
            <div>
                <Layout>
                    <Switch> 
                        <PublicRoute user={this.props.user} exact path="/" component={Home} />
                        <PublicRoute user={this.props.user} restricted exact path="/sign_in" component={SignIn} />
                        <PrivateRoute user={this.props.user} exact path="/dashboard" component={Dashboard} />
                    </Switch>
                </Layout>
            </div>
        )
    }
}

export default Routes;
