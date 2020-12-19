import Axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { NotificationContext } from '../../shared/Notifications';
import { GlobalStoreContext } from '../../shared/Globals';

const Delete = () => {
  const { id } = useParams();
  const { setNotification } = useContext(NotificationContext);
  const {globalStore} = useContext(GlobalStoreContext);

  useEffect(() => {
    Axios.post(`${globalStore.REACT_APP_ENDPOINT}/keyboard/delete`, { _id: id })
    
    
    .then(() => {
      setNotification(`Keyboard was deleted successfully.`);
    })
    .catch(error => {
      setNotification(`Couldn't delete the selected keyboard due to an error: ${error.message}`);
    });
  }, []);

  return <Redirect to="/keyboard"/>;
}
 
export default Delete;