import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faHome, faExternalLinkAlt, faSignOutAlt, faImages } from '@fortawesome/free-solid-svg-icons';
import Amplify from 'aws-amplify';
import awsConfig from './aws_config'

import Dashboard from './Views/Dashboard/Dashboard';
import Editor from './Views/Editor/Editor';

Amplify.configure(awsConfig);
Amplify.Logger.LOG_LEVEL = 'DEBUG';


class App extends React.Component {

  signOut() {
    window.location.reload();
  }

  render() {
    
    return (
      <div> 
        <Router>
          <Route render={({ location, history }) => (
            <React.Fragment>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="/">FoodFunk</Navbar.Brand>
            </Navbar>

              <SideNav onSelect={(selected) => {
                const to = '/' + selected;
                if (location.pathname !== to) {
                    history.push(to);
                }
              }}>
              <SideNav.Toggle />
                <SideNav.Nav defaultSelected="dashboard">
                    <NavItem eventKey="dashboard">
                      <NavIcon>
                        <FontAwesomeIcon id="icon" icon={faHome} />
                      </NavIcon>
                      <NavText>
                          Dashboard
                      </NavText>
                    </NavItem>
                    <NavItem eventKey="edit">
                      <NavIcon>
                        <FontAwesomeIcon id="icon" icon={faPlusSquare} />
                      </NavIcon>
                      <NavText>
                          New Post
                      </NavText>
                    </NavItem>
                    <NavItem eventKey="images">
                      <NavIcon>
                        <FontAwesomeIcon id="icon" icon={faImages} />
                      </NavIcon>
                      <NavText>
                          Images
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
                    <NavItem onClick={this.signOut}>
                      <NavIcon>
                        <FontAwesomeIcon id="icon" icon={faSignOutAlt} />
                      </NavIcon>
                      <NavText>
                          Preview
                      </NavText>
                    </NavItem>
              </SideNav.Nav>
            </SideNav>

            <div className="main">
              <Route path="/" exact component={Dashboard} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/edit" component={Editor} />
            </div>

        </React.Fragment>
            )}
            />
        </Router>

      </div>
    )

  }
};

export default App;