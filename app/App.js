import React, { Component } from 'react';
import {render} from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import Main from './components/Main.jsx';
import AboutPage from './components/pages/AboutPage.jsx';
import ListsPage from './components/pages/ListsPage.jsx';
import UserProvider from './components/do-dont/UserProvider.jsx';

class App extends Component {

  render(){
    return (
      <Router history = {hashHistory}>
        <Route path="/" component={Main}>
          <Route path="about" component = {AboutPage}/>
          <IndexRoute component={ListsPage} pageTitle = "Do Don't"></IndexRoute>
        </Route>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));
