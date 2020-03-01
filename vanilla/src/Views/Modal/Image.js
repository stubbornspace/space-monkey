
import { Button, Modal } from 'react-bootstrap';


				<div>
        <Modal show={this.state.showUpload} onHide={this.handleUpload}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            Woohoo, you're reading this text in a modal!
            </Modal.Body>
          <Modal.Footer>
          <Button variant="link" onClick={this.handleUpload}>
            Save Changes
          </Button>
          </Modal.Footer>
        </Modal>
      </div>