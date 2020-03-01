import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { Button, Modal, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'easymde/dist/easymde.min.css';


class Editor extends React.Component {
  	constructor(props) {
		super(props);
		this.state = {
			markdown:'',
			showUpload:false,
			showSave:false
		}
	};

  	handleMarkdown = value => {
    	this.setState({ markdown: value });
  		console.log(value)
	 };
	 
	 handleUpload = () => {
        this.setState(prevState => ({
            showUpload: !prevState.showUpload
		}));
	}
	
	handleSave = ()=>{
		this.setState({showSave:true},()=>{
		  window.setTimeout(()=>{
			this.setState({showSave:false})
		  },2000)
		});
	  }

	render() {   
    
    	return (
			<div>
				<Alert  show={this.state.showSave} variant="success">
					This is a alert—check it out!
				</Alert>

				<div className="top-nav">
                	<Link to="/">Dashboard</Link>
					<Link to="#update" onClick={this.handleUpload}>Upload Image</Link>
					<Link to="#save" onClick={this.handleSave}>Save</Link>
					<Link to="/">Publish</Link>
              	</div>	

				<div className="editor">
				<SimpleMDE 
					onChange={this.handleMarkdown}
					value={this.state.markdown}
				/>
				</div>

				<Modal show={this.state.showUpload} onHide={this.handleUpload}>
					<Modal.Body>
						Woohoo, you're reading this text in a modal!
						<Button variant="link" onClick={this.handleUpload}>
							Save
						</Button>
					</Modal.Body>
			
				</Modal>

			
			</div>
    	)
  	}
};

export default Editor;