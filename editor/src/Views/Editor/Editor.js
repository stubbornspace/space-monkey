import React from 'react';
import { Button, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { API } from 'aws-amplify';


class Editor extends React.Component {
  	constructor(props) {
		super(props);
		this.state = {
			uuid: null,
			title:"",
			upload: false,
			publish: false,
			md:  "   ---  "  + 
			"   author: \"Zaphod\"  "  + 
			"   date: 2018-11-25  "  + 
			"   linktitle: title  "  + 
			"   cookingtime: mins  "  + 
			"   title: title  "  + 
			"   description:   "  + 
			"   ---  "  + 
			"     "  + 
			"   # Title  "  + 
			"     "  + 
			"   ### Ingredients  "  + 
			"   * food  "  + 
			"     "  + 
			"   ### Instructions  "  + 
			"   1. cook  "  + 
			"    " 
		};
		this.handleMd = this.handleMd.bind(this);
	}

  	handleMd = value => {
    	this.setState({ md: value });
  		//console.log(value)
 	};

	handleTitle = event => {
		this.setState({ title: event.target.value });
		//console.log(event.target.value)
	};

	getPost = async () => {
		try {
			if (this.props.location.state) {
				console.log('UUID')
				const data = await API.get('hugo', '/posts/'+this.props.location.state.uuid);
				this.setState({
					uuid: this.props.location.state.uuid,
					title: data.title,
					md: data.md,
					upload: true
				});
				console.log(data.title)
			} else {
				this.setState({title: "NEW POST"})
			}
		} catch (err) {
            alert(err);
		}
	}

	createPost = async () => {
		try {
			const payload = {
				uuid: this.state.uuid,
				title:this.state.title,
				md: this.state.md
			}
			await API.post('hugo', '/posts', { body: payload });
			console.log('create post')
		} catch (err) {
            alert(err);
		}
	}
	
	componentDidMount() { 
		this.getPost();
	}; 

	render() {   
    
    	return (
			<div>
				<Row>
					<Col>
						<InputGroup size="sm" className="mb-3">
							<InputGroup.Prepend>
							<InputGroup.Text id="title">Title</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								defaultValue={this.state.title}
								onChange={this.handleTitle}
							/>
						</InputGroup>
					</Col>
					<Col>
						<div className="tools">
							<Button size="sm" variant="link" onClick={this.createPost}>Save</Button>
						</div>
					</Col>
				</Row>
				<SimpleMDE 
					onChange={this.handleMd}
					value={this.state.md}
				/>
			</div>
    	)
  	}
};

export default Editor;