import React, { useContext, useState, useEffect } from 'react';
import { NotificationContext } from '../shared/Notifications';
import { GlobalStoreContext } from '../shared/Globals';
import { UserContext } from '../Authentication/UserProvider';
import Axios from 'axios';
import Header from '../shared/Header';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Mouse = () => {
  const { setNotification } = useContext(NotificationContext);
  const { globalStore } = useContext(GlobalStoreContext);
  const { user } = useContext(UserContext);
  const [keyboard, setKeyboards] = useState([]);

  useEffect(() => {
    Axios.get(`${globalStore.REACT_APP_ENDPOINT}/mouse`)
    .then(({ data }) => {
      setKeyboards(data);
    })
    .catch(error => {
      setNotification({
        type: "danger",
        message: `There was an error retrieving the data of mouse: ${error.message}`
      });
    });
  }, [globalStore, setNotification]);

  return (
    <>
      <Header title="mouse"/>

      <Container>
        {mouse && mouse.length > 0 ? (
          mouse.map((mouse, i) => (
            <>
              <blockquote>
                {mouse.mouseStyle}: "{mouse.mouseSeries}" ~ {mouse.dpiModeNum}
              </blockquote>

              {user && user.token ? (
                <Link to={`/mouse/edit/${keyboard._id}`}>.edit.</Link>
              ) : null}
            </>
          ))
        ) : null}
      </Container>
    </>
  );
}
 
export default Mouse;