import React from 'react';
import { Table, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { API } from 'aws-amplify';

import hotdog from '../../hotdog.jpg';

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

  componentDidMount() { 
    this.getItems();
  }; 


  render() {

    const { data } = this.state;

    const tableBody = (
      <tbody  ref={this.tableBody} >
        {data.map(i => (
          <tr key={i.uuid}>
              <td>
                <Image 
                  width="64"
                  fluid
                  src={hotdog}
                  alt="Post"
                />
              </td>
              <td >{i.title}</td>
              <td>{i.date}</td>
              <td className="td-center">
                <Link to= {{ pathname:"/edit", state:{ uuid:i.uuid} }}>
                  <FontAwesomeIcon size="sm" color="grey" icon={faEdit} />
                </Link>
              </td>
          </tr>
        ))}
      </tbody>
    )
    
    return (
      
      <div>

        <Table className="list" borderless size="sm">
            { tableBody }
        </Table>

      </div>
    )

  }
};

export default Dashboard;



