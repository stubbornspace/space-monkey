import React from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator,PhotoPicker, S3Album, S3Image } from 'aws-amplify-react';

Amplify.configure(awsconfig);

const customPrefix = {
  public: 'hugo/content/images/',
};

const imageStyle = {
  width: '80px'
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      name:null,
      type:null,
      show:false,
      images:[]
    }
    this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
  }

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

  onSelect = data => {
    this.setState({
      file: data.file,
      name: data.name,
      type: data.type,
    });
    console.log(data)
  }

  uploadImage = async () => {
    const { name, file, type } = this.state;
    try {
      await Storage.put(name, file, { 
        contentType:type,
        customPrefix: customPrefix,
      });
    } catch(err) {
      alert(err)
    }
    this.setState({ show: false });
  };

  listImage = async () => {
    
    try {
      const data = await Storage.list('', {
        customPrefix: customPrefix,
      })
      console.log(JSON.stringify(data,null,2))
      this.setState({images: data})
    } catch(err) {
      alert(err)
    }
    this.setState({ show: false });
  };

  componentDidMount() { 
		this.listImage();
	}; 

  render() {

    return (
      <div className="wrapper">

        <h2>S3 Upload example</h2>
        <Button variant="primary" onClick={this.handleShow}>
					Upload
        </Button>

        <div>
          <ul>
            {this.state.images.map((image, index) => (

              <Card style={{ width: '8rem' }}>
              <Card.Body key={index}>
                <S3Image style={imageStyle} imgKey={`hugo/content/images/${image.key}`} />
              </Card.Body>
              </Card>
            ))}
          </ul>

          <S3Album path={'hugo/content/images/'} />

        </div>


				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Body><PhotoPicker preview onPick={data => this.onSelect(data)} />
          <Button id="upload" size="sm" variant="primary" onClick={this.uploadImage}>
							Upload
            </Button>
          <Button size="sm" id="upload" variant="link" onClick={this.handleClose}>
							cancel
            </Button>
            </Modal.Body>
				</Modal>

      </div>
    )
  }

};

export default withAuthenticator(App, true);