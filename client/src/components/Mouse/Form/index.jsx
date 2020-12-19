import React, { useContext, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { NotificationContext } from '../../shared/Notifications';
import { UserContext } from '../../Authentication/UserProvider';
import { GlobalStoreContext } from '../../shared/Globals';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const MouseForm = ({ endpoint, preload }) => {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const { globalStore } = useContext(GlobalStoreContext);

      useEffect(() => {
        setInputs({...preload});
  },   [preload])

      const handleChange = event => {
        event.persist();
        setInputs({
          ...inputs,
          [event.target.name]: event.target.value
        });
  };

  const handleSubmit = event => 
  {
        event.preventDefault();
        console.log(inputs);

        Axios.post(`${globalStore.REACT_APP_ENDPOINT}/${endpoint}`, {
          ...inputs,
          secret_token: (user && user.token)
  })     .then(({ data }) => {
          if (data) {
            setNotification({
              type: "success",
              message: "Mouse entry was updated successfully"
            });
 }

          setRedirect(true);
 })
      .catch((error) => {
        setNotification({
          type: "danger",
          message: `There was an error updating the mouse entry: ${error.message}`
        });
 });
  };

  if (redirect) return <Redirect to="/mouse"/>;
  return (
    <Form onSubmit={handleSubmit}>
      <input 
        onChange={handleChange} 
        name="mouseStyle" 
        placeholder="mouseStyle"
        defaultValue={inputs.mouseStyle}
      />
      <input 
        onChange={handleChange} 
        name="mouseSeries" 
        placeholder="mouseSeries"
        defaultValue={inputs.mouseSeries}
      />
      <input 
        onChange={handleChange} 
        name="dpiModeNum" 
        placeholder="dpiModeNum"
        defaultValue={inputs.dpiModeNum}
      />
      <button type="submit">Submit</button>
    </Form>
  );
}
 
export default MouseForm;