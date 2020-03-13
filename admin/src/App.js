import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Amplify from 'aws-amplify';
import awsConfig from './aws_config'

import NavBar from './Views/NavBar';
import Dash from './Views/Dash'; 
import Edit from './Views/Edit'; 

Amplify.configure(awsConfig);
//Amplify.Logger.LOG_LEVEL = 'DEBUG';


const App = (props) => {

  return (
    <Router>
    <div className="wrap"> 
      
      <NavBar />

    <div className="main">
      <Switch>
        <Route path="/" exact component={Dash} />
        <Route path="/dash" exact component={Dash} />
        <Route path="/edit" component={Edit} />
      </Switch>
    </div>

    </div>
    </Router>
  );
}

export default App;
