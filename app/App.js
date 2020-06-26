import React, { Component } from 'react';
import {render} from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Main from './components/Main.jsx';

import ListsPage from './components/pages/ListsPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import ListOpsPage from './components/pages/ListOpsPage.jsx';
import BooksPage from './components/pages/BooksPage.jsx';

class App extends Component {

    constructor(){
        super();
        this.user = JSON.parse(localStorage.getItem("user")) || null;
        this.state = {
            hasUser : this.user != null ? true : false,
            debugMode : false
        }
    }

    HandleGetUser(newUser) {
        this.user = newUser;
        localStorage.setItem("user", JSON.stringify(newUser));
        this.setState({
            hasUser : true
        });
    }

    HandleLogOut(){
        this.user = null;
        localStorage.removeItem("user");
        localStorage.removeItem("does");
        localStorage.removeItem("donts");
        localStorage.removeItem("ListUpdated");
        this.setState({
            hasUser : false
        });
    }

    render(){
        return (
            this.state.hasUser ?
                <Router history = {hashHistory}>
                    <Route path="/" component={Main}>
                        <Route path="list-ops" user={this.user} component = {ListOpsPage}
                            OnLogOut={this.HandleLogOut.bind(this)}/>
                        <IndexRoute component={ListsPage} pageTitle = "Do Don't" user = {this.user}
                            OnLogOut={this.HandleLogOut.bind(this)}/>
                        <Route path="books" user={this.user} component = {BooksPage}
                            OnLogOut={this.HandleLogOut.bind(this)}/>
                    </Route>
                </Router>
            : <LoginPage onGetUser={this.HandleGetUser.bind(this)} debugMode={this.state.debugMode}></LoginPage>
        );
    }
}

render(<App />, document.getElementById('root'));
