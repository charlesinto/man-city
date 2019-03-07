import React, { Component } from 'react';

import Layout from './Components/HOC/Layout';
import { Switch } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Admin';
import PrivateRoute from './Components/AuthRoutes/PrivateRoute';
import PublicRoute from './Components/AuthRoutes/PublicRoute';
import AdminMatches from './Components/Admin/Matches';
import EditMatch from './Components/Admin/AddEditMatch'

class Routes extends Component{
    render(){
        return(
            <div>
                <Layout>
                    <Switch> 
                        <PublicRoute user={this.props.user} exact path="/" component={Home} />
                        <PublicRoute user={this.props.user} restricted exact path="/sign_in" component={SignIn} />
                        <PrivateRoute user={this.props.user} exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute user={this.props.user} exact path="/admin_matches" component={AdminMatches} />
                        <PrivateRoute user={this.props.user} exact path="/admin_matches/edit_match/:id" component={EditMatch} />
                        <PrivateRoute user={this.props.user} exact path="/admin_matches/edit_match" component={EditMatch} />
                    </Switch>
                </Layout>
            </div>
        )
    }
}

export default Routes;
