import './landing.css';

import React, {Component} from 'react';
import Card from '../../components/card/Card';
import {withRouter} from "react-router-dom";

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  redirectToLogin = () => {
    this.props.history.push('/login');
  }

  render() {
    return (
      <Card title="Handwriting Data Collection">

        <div class="caution">
            <p>1. If you do not wish to participate gift card lottery, do not use your email address as username.</p>
            <p>2. Mobile devices or tablets only. Please DO NOT use your laptop or desktop to complete the survey.</p>
            <p>3. You may choose not to disclose your ethnicity.</p>
        </div>

        <input type="submit" class="login login-submit" value="Login" onClick={this.redirectToLogin}></input>
      </Card>
    );
  }
}

export default withRouter(Landing);
