import React from 'react';
import { Button, FormControl, InputGroup, } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
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

	onChange = async (e) => {
		try {
		  const file = e.target.files[0];
		  const name = e.target.files[0].name
		 console.log(file,name)
		} catch(err) {
		  alert(err)
		}
		alert('SUCCESS')
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
				md: data.md,
				file: data.file
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
		alert('Post saved')
		
	}
	
	componentDidMount() { 
		this.getPost();
		bsCustomFileInput.init()
	}; 

	render() {   
    
    	return (
			<div>

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
						<InputGroup.Text id="title">File</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							defaultValue={this.state.file}
							onChange={this.handleTitle}
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
							defaultValue={this.state.fimageile}
							onChange={this.handleTitle}
						/>
					<InputGroup.Append>
						<Button variant="outline-secondary" onClick={this.createPost}>Update</Button>
					</InputGroup.Append>
				</InputGroup>

				<SimpleMDE 
					onChange={this.handleMd}
					value={this.state.md}
				/>

			</div>
    	)
  	}
};

export default Editor;