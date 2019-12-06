import React, { Component } from 'react';
import {render} from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Main from './components/Main.jsx';

import AboutPage from './components/pages/AboutPage.jsx';
import ListsPage from './components/pages/ListsPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import ListOpsPage from './components/pages/ListOpsPage.jsx';

class App extends Component {

    constructor(){
        super();
        this.user = null;
        this.state = {
            hasUser : false,
            debugMode : false
        }
    }

    HandleGetUser(newUser) {
        this.user = newUser;
        this.setState({
            hasUser : true
        });
    }

    render(){
        return (
            this.state.hasUser ?
                <Router history = {hashHistory}>
                    <Route path="/" component={Main}>
                        <Route path="about" component = {AboutPage}/>
                        <Route path="list-ops" user={this.user} component = {ListOpsPage}/>
                        <IndexRoute component={ListsPage} pageTitle = "Do Don't" user = {this.user} ></IndexRoute>
                    </Route>
                </Router>
            : <LoginPage onGetUser={this.HandleGetUser.bind(this)} debugMode={this.state.debugMode}></LoginPage>
        );
    }
}

render(<App />, document.getElementById('root'));
