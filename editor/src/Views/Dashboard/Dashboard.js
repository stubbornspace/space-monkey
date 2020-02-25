import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { API } from 'aws-amplify';

class Dashboard extends React.Component {
  constructor(props) { 
    super(props); 
    this.state = {
        data:[],
        isLoading: true
      }
  };

  getItems = async () => {
    this.setState({data:[], isLoading:true});
    try {
        const data = await API.get('hugo', '/posts');
        this.setState({data:data, isLoading:false});
        if (data.length === 0 ) {
            this.setState({noData:true});
        }   
    } catch (err) {
        alert(err);
    }
  };

  handleSelect= async () => {
    console.log('clicked')
  }

  componentDidMount() { 
    this.getItems();
  }; 


  render() {

    const { data } = this.state;

    const tableBody = (
      <tbody  ref={this.tableBody} >
      {data.map(i => (
          <tr key={i.uuid}>
              <td>{i.title}</td>
              <td>{i.file}</td>
              <td>{i.date}</td>
              <td className="td-center">
                  <Link to= {{ pathname:"/edit", state:{ uuid:i.uuid} }}>
                  <FontAwesomeIcon id="icon" icon={faArrowRight} />
                  </Link>
              </td>
          </tr>
      ))}
      </tbody>
    )
    
    return (
      
      <div>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>Title</th>
                <th>File</th>
                <th>Date</th>
                <th></th>
                </tr>
            </thead>
            { tableBody }
        </Table>
      </div>
    )

  }
};

export default Dashboard;



