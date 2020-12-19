import React, { useContext, useState, useEffect } from 'react';
import { NotificationContext } from '../shared/Notifications';
import { GlobalStoreContext } from '../shared/Globals';
import Header from '../shared/Header';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../Authentication/UserProvider';
import { Table } from 'react-bootstrap';
import Axios from 'axios';

const Keyboard = () => {
  const { setNotification } = useContext(NotificationContext);
  const { globalStore } = useContext(GlobalStoreContext);
  const { user } = useContext(UserContext);
  const [keyboard, setKeyboards] = useState([]);

  useEffect(() =>
   {
    Axios.get(`${globalStore.REACT_APP_ENDPOINT}/keyboard`)
    .then(({ data }) =>
     {
      setKeyboards(data);
    })
    .catch(error =>
       {
      setNotification
      ({
        type: "danger",
        message: `There was an error retrieving the data of keyboard: ${error.message}`
      });
    });
  }, [globalStore, setNotification]);

  return (
    <>
      <Header title="Keyboard"/>

      <Container>
        {keyboard && keyboard.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <th>keyboard Style</th>
              <th>key Type</th>
              <th>quantity</th>
            </thead>

            <tbody>
              {keyboard.map((Keyboard, i) => (
                <tr key={i}>
                  <td>
                    {Keyboard.keyboardStyle}
                  </td>
                  
                  <td>
                    {Keyboard.keyType}
                  </td>

                  <td>
                    {Keyboard.quantity}
                  </td>

                  <td>
                  
                  <Link to={`/keyboard/edit/${Keyboard._id}`}>Edit</Link>
                  &nbsp;|&nbsp;   
                  <Link to={`/keyboard/delete/${Keyboard._id}`}>Delete</Link>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </Container>
    </>
  );
}
 
export default Keyboard;