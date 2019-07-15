import React from 'react';
import {  Button } from 'reactstrap';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Button  color="secondary" onClick={firebase.doSignOut}>Cerrar Sesion</Button>
  
);

export default withFirebase(SignOutButton);