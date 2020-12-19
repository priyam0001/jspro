import React, { useContext, useState, useEffect } from 'react';
import { NotificationContext } from '../../shared/Notifications';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { GlobalStoreContext } from '../../shared/Globals';
import { UserContext } from '../../Authentication/UserProvider';

const KeyboardForm = ({ endpoint, preload }) => {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);
  const { setNotification } = useContext(NotificationContext);
  const { globalStore } = useContext(GlobalStoreContext);
  const { user } = useContext(UserContext);


  useEffect(() => 
  {
    setInputs({...preload});
  }, [preload])

  const handleChange = event =>
   {
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

    Axios.post(`${globalStore.REACT_APP_ENDPOINT}/${endpoint}`,
     {
      ...inputs,
      secret_token: (user && user.token)
    })
    .then(({ data }) =>
     {
      if (data) 
      {
        setNotification(
          {
          type: "success",
          message: "keyboard was added successfully"
        });
      }

      setRedirect(true);
    })
    .catch((error) =>
     {
      setNotification(
        {
        type: "danger",
        message: `There was an error updating the keyboard: ${error.message}`
      });
    });
  };

  if (redirect) return <Redirect to="/keyboard"/>;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label>keyboard Style</Form.Label>
      

      <Form.Group>
        <Form.Control 
          onChange={handleChange} 
          name="keyboardStyle" 
          placeholder="Gaming"
          defaultValue={inputs.keyboardStyle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>key Type</Form.Label>

        <Form.Control 
          onChange={handleChange} 
          name="keyType" 
          placeholder="red"
          defaultValue={inputs.keyType}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>quantity</Form.Label>

        <Form.Control 
          onChange={handleChange} 
          name="quantity" 
          placeholder="1"
          defaultValue={inputs.quantity}
        />
      </Form.Group>

      <Form.Group>
        <Button type="submit">Submit</Button>
      </Form.Group>
    </Form>
  );
}
 
export default KeyboardForm;