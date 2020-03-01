import React from 'react';


class Test extends React.Component {

	render() {   
    
    	return (

        <div>
        From App:  {this.props.data.fish }
        </div>

    	)
  	}
};

export default Test;
