import React from 'react';
import Form from '../Form';
import Header from '../../shared/Header';
import { Container } from 'react-bootstrap';

const New = () => {
  return (
    <>
      <Header title="Keyboard">
      New keyboard
      </Header>

      <Container>
        <Form endpoint="keyboard"/>
      </Container>
    </>
  );
}
 
export default New;