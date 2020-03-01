import React from 'react';
import { Link } from "react-router-dom";
import { faPlusSquare  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Dashboard extends React.Component {

	render() {   
    
    	return (
			<div>
				<ul>
					<li>
					<Link to= {{ pathname:"/editor", state:{ uuid:'2345'} }}>	
						Thai Style Fish Cakes
					</Link>
					</li>
					<li>
					<Link to= {{ pathname:"/editor", state:{ uuid:'1234'} }}>	
						Pot Roast Chicken & Savoy
					</Link>
					</li>
				</ul>
			
				<nav className="top-nav">
                	<Link to="/editor">
					<FontAwesomeIcon size="lg" icon={faPlusSquare} />
					</Link>
              	</nav>
				
			</div>
    	)
  	}
};

export default Dashboard;