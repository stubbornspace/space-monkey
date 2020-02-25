import React from 'react';
import DataTable from 'react-data-table-component';
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

    const columns = [
      {
        name: 'ID',
        selector: 'uuid',
        sortable: true
      },
      {
        name: 'Title',
        selector: 'title',
        grow: 2,
        sortable: true
      },
      {
        name: 'Created',
        selector: 'date',
        sortable: true
      },
    ];

    const { data } = this.state;
    
    return (

      <div>
        <DataTable
          columns={columns}
          data={data}
          pagination
        />
      </div>
    )

  }
};

export default Dashboard;



