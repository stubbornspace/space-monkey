import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem,  } from 'reactstrap';
import { API } from 'aws-amplify';

const Dash = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const results = await API.get('fugo', '/posts');
        setData(results)
      } catch (err) {
        alert(err);
      }
    };
    getItems();
  }, []);

  return (
    <div className="dash">
      <ListGroup flush>
        {data.map(({ id, title }) => (
          <ListGroupItem key={id}>
            <Link to={{
              pathname:"/edit",
              id:id
              }}>{title}
            </Link>
            <span> - {id}</span>
          </ListGroupItem>
        ))}
      </ListGroup>

    </div>
  );
}

export default Dash;
