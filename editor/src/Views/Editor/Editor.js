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
			file:null,
			title:"",
			upload: false,
			publish: false,
			md:'' 
		}
	};

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
			console.log('UUID')
			let uuid;
			if (this.props.location.state) {
				uuid = this.props.location.state.uuid;
				this.setState({
					uuid: uuid
				})
			} else {
				uuid = '0000'
			}
			const data = await API.get('hugo', '/posts/'+uuid);
			this.setState({
				title: data.title,
				md: data.md
			});
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