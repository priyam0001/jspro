import React from 'react';
import Form from '../Form';
import Header from '../../shared/Header';
import { Container } from 'react-bootstrap';

const New = () => {
  return (
    <>
      <Header title="mouse">
        Hi I'm a man-child.
      </Header>

      <Container>
        <Form endpoint="mouse"/>
      </Container>
    </>
  );
}
 
export default New;