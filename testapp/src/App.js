import React from 'react';
import Test from './Test/Test';
import './App.css'


class App extends React.Component {

	render() {   

      const data = {
        fish:"pike"
      }
    
    	return (

        <div className="App">
         Hello

         <Test data = {data}/>
        </div>

    	)
  	}
};

export default App;
