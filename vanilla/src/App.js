import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import logo from './logo.png';
import Dashboard from './Views/Dashboard/Dashboard';
import Editor from './Views/Editor/Editor';


class App extends React.Component {

	render() {   
    
    	return (

        <div>
          <Router>

            <header className="header">
              <Link to="/">
                <img width="128" src={logo} alt="bacon"/>
              </Link>
            </header>
    
            <main className="main">
              <Switch>
                <Route exact path="/">
                  <Dashboard />
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                </Route>
                <Route path="/editor">
                  <Editor />
                </Route>
              </Switch>
            </main>

          </Router>
        </div>

    	)
  	}
};

export default App;
