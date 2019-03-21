import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
import React, {Component} from 'react';
import Login from './pages/login/Login';
import Validation from './pages/validation/Validation';

export default class App extends Component {
    render() {
    return (
        <Router>
            <div>
            <ul hidden>
                <li>
                <Link to="/login">Login</Link>
                </li>
                <li>
                <Link to="/validation">Validation</Link>
                </li>
            </ul>
            <Route path="/login" component={Login} />
            <Route path="/validation" component={Validation} />
            <Route exact path="/" render={() => 
                <Redirect to={{pathname: "/login",}}/>
            } />
            </div>
        </Router>
        );
    }
}