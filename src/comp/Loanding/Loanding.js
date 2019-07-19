
import * as React from 'react';
import { Spinner } from 'reactstrap';
import { Row, Col, Alert } from 'reactstrap';

export const Loanding = () => {
  return (
    <Row>
      <Col className="d-flex justify-content-center ">
        <Spinner className="mt-5" style={{ width: '3rem', height: '3rem' }} color="primary"  />
      </Col>
    </Row>
  );
};

export const Creando = () => {
  return (
    <Row>
      <Col className="d-flex justify-content-center mt-5">

      <Alert color="light">
      Creando Usuario 
      <Spinner size="sm"  type="grow" className="ml-2" color="primary" />
      <Spinner size="sm"  type="grow" className="ml-2" color="primary" />
      <Spinner size="sm"  type="grow" className="ml-2" color="primary" />
      <Spinner size="sm"  type="grow" className="ml-2" color="primary" />
      </Alert>

      </Col>
    </Row>
  );
};