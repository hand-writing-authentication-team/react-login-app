import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
import React, {Component} from 'react';
import Login from './pages/login/Login';
import Validation from './pages/validation/Validation';
import Landing from './pages/landing/Landing'

import "./app.css";

class App extends Component {
    renderSwitch = () => {
        if (window.localStorage.getItem('username')) {
            return (<Redirect to={{pathname: "/validation"}}/>);
        } else {
            return (<Redirect to={{pathname: "/landing"}}/>);
        }
    }
    
    render() {
        return (
            <Router>
                <Route path="/login" component={Login} />
                <Route path="/validation" component={Validation} />
                <Route path="/landing" component={Landing} />
                <Route exact path="/" render={this.renderSwitch} />
            </Router>
        );
    }
}

export default App;