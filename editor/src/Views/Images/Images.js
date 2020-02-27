import React from 'react';

import { API } from 'aws-amplify';

import hotdog from './hotdog.jpg';

class Images extends React.Component {
  	constructor(props) {
		super(props);
		this.state = {
			images: [],
		}
    };
    
    getImages = async () => {
		try {
			console.log('GET IMAGES')
			const data = await API.get('hugo', '/images');
			this.setState({
				title: data.title,
				md: data.md
			});
			console.log(data.title)
		} catch (err) {
            alert(err);
		}
	}

    handleClick = value => {
  		console.log("value::"+value)
     };


     
	render() {   

    	return (
			<div>
                <img
                    width={128}
                    height={128}
                    className="mr-3"
                    src={hotdog}
                    alt="Generic placeholder"
                    onClick={() => this.handleClick('James')}
                />
             
			</div>
    	)
  	}
};

export default Images;