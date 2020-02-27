import React from 'react';
import { Button, FormControl, InputGroup, Row, Col, Image } from 'react-bootstrap';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { API } from 'aws-amplify';

import hotdog from '../../hotdog.jpg';

class Editor extends React.Component {
  	constructor(props) {
		super(props);
		this.state = {
			uuid: null,
			title: null,
			postFile:null,
			postTitle:'',
			upload: false,
			markdown:'',
			image:hotdog,
			imageFile:null
		}
	};

  	handleMarkdown = value => {
    		this.setState({ markdown: value });
  		//console.log(value)
 	};

	handleTitle = event => {
		this.setState({ postTitle: event.target.value });
		//console.log(event.target.value)
	};

	handleImage = event => {
		this.setState({ 
			image: event.target.files[0],
			imageFile: event.target.files[0].name,

		});
		//console.log(event.target.value)
	};

	getPost = async () => {
		try {
			console.log('UUID')
			let uuid;
			if (this.props.location.state) {
				uuid = this.props.location.state.uuid;
				this.setState({
					uuid: uuid
				})
			} else {
				//This is the Markdown template for posts
				uuid = '0000'
			}
			const data = await API.get('hugo', '/posts/'+uuid);
			this.setState({
				title: data.title,
				md: data.md,
				file: data.file
			});
			if (data.image) {
				const data = await API.get('hugo', '/images/'+uuid);
				this.setState({
					image: data.image,
					imageFile:data.file
				})
			}
			console.log(data.title)
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
		alert('Post saved')
		
	}
	
	componentDidMount() { 
		this.getPost();	
	}; 

	render() {   
    
    	return (
			<div>

				<Row>
				
					<Col xs={9}>
						<InputGroup size="sm" className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="title">Title</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								defaultValue={this.state.title}
								onChange={this.handleTitle}
							/>
						<InputGroup.Append>
							<Button variant="outline-secondary" onClick={this.createPost}>Save Post</Button>
						</InputGroup.Append>
					</InputGroup>
					<InputGroup size="sm" className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="title">Post File</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								defaultValue={this.state.postFile}
								onChange={this.handleFile}
							/>
						<InputGroup.Append>
							<Button variant="outline-secondary" onClick={this.createPost}>Delete</Button>
						</InputGroup.Append>
					</InputGroup>
					<InputGroup size="sm" className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="title">Image</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								defaultValue={this.state.imageFile}
								onChange={this.handleImage}
							/>
						<InputGroup.Append>
							<Button variant="outline-secondary" onClick={this.createPost}>Update</Button>
						</InputGroup.Append>
					</InputGroup>
					</Col>

					<Col xs={3}>
						<Image 
							fluid
							src={this.state.image}
							alt="Post"
						/>
					</Col>
				
				</Row>

				<SimpleMDE 
					onChange={this.handleMarkdown}
					value={this.state.markdown}
				/>

			</div>
    	)
  	}
};

export default Editor;