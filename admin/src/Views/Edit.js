import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Row, Col, Input, FormGroup, Label } from 'reactstrap';
import { API } from 'aws-amplify';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const Edit = (props) => {

  const id = props.location.id
  const [title, setTitle] = useState('')
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    
    const getPost = async () => {
      try {
        const data = await API.get('fugo', `/posts/${id}`);
        setTitle(data.title)
        setMarkdown(data.markdown)
        console.log(data)
      } catch (err) {
        alert(err);
      }
    };
    if (id) {
      getPost();
    } else {
    console.log('new')
    }
  },[]);

  const savePost = async () => {
    try {
      const payload = {
        id:id,
        title:title,
        markdown:markdown
      }
      await API.post('fugo', '/posts/', {body:payload} );
    } catch (err) {
      alert(err);
    }
    alert('Success')
  }

  const delPost = async () => {
      try {
        const payload = {
          id:id,
          title:title,
          markdown:markdown
        }
        await API.post('fugo', '/posts/', {body:payload} );
      } catch (err) {
        alert(err);
      }
    alert('Success')
  }

  return (
    <div>
          <Row>
            <Col sm="9">
              <FormGroup row>
                <Label for="title" sm={1}>Title</Label>
                <Col sm={11}>
                <Input value={title} onChange={(e) => setTitle(e.target.value)}  bsSize="sm" type="text" name="title" id="title" />
                </Col>
              </FormGroup>
            </Col>
            <Col sm="3">
              <ButtonGroup size="sm">
                <Button color="link" onClick={savePost}>save</Button>
                <Button color="link" onClick={delPost}>delete</Button>
              </ButtonGroup>
            </Col>
          </Row>      
          <br />
          <SimpleMDE 
					  value={markdown}
            onChange={setMarkdown}
				  />
    </div>
  );
}

export default Edit;
