import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faListAlt, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';


import Dashboard from './Views/Dashboard/Dashboard';
import Editor from './Views/Editor/Editor';

class App extends React.Component {
  
  noMatch({ location }) {
    return (
      <div>
        <h3>
          Error 404 Page not found: <code>{location.pathname}</code>
        </h3>
      </div>
    );
  }

  render() {
    
    return (
      <div>
        <Router>

          <div>
            <SideNav onSelect={(selected) => { console.log(selected) }} >
              <SideNav.Toggle />
                <SideNav.Nav defaultSelected="dashboard">
                    <NavItem eventKey="dashboard">
                      <NavIcon>
                        <FontAwesomeIcon id="icon" icon={faListAlt} />
                      </NavIcon>
                      <NavText>
                          Dashboard
                      </NavText>
                    </NavItem>
                    <NavItem eventKey="newpost">
                      <NavIcon>
                        <FontAwesomeIcon id="icon" icon={faPlusSquare} />
                      </NavIcon>
                      <NavText>
                          New Post
                      </NavText>
                    </NavItem>
                    <NavItem eventKey="preview">
                      <NavIcon>
                        <FontAwesomeIcon id="icon" icon={faExternalLinkAlt} />
                      </NavIcon>
                      <NavText>
                          Preview
                      </NavText>
                    </NavItem>
              </SideNav.Nav>
            </SideNav>
          </div>

   
          <div className="main">
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/edit" component={Editor} />
              <Route component={this.noMatch} />
            </Switch>
          </div>

        </Router>
      </div>
    )

  }
};

export default App;