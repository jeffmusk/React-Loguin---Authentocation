import React,{Component} from 'react';
import { Link , withRouter} from 'react-router-dom';
import * as ROUTES from '../../Constantes/routes';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { Col, Button, Form, FormGroup, Label, Input, Row, Alert } from 'reactstrap';

const Registro = () => (
  <div>
    <h1 className="text-center mt-5">Registro</h1>
      <SignUpForm  />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase  extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {

    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();

  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username,  email,  passwordOne,   passwordTwo,   error, } = this.state;

    const isInvalid =      passwordOne !== passwordTwo ||     passwordOne === '' ||      email === '' ||      username === '';

    return (
      <Row className="mt-5">
      <Col sm={2} >

      </Col>
      <Col sm={8} >
        <Form onSubmit={this.onSubmit}>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>User Name</Label>
            <Col sm={9}>
              <Input name="username"    value={username}  onChange={this.onChange} type="text"  placeholder="Nombre de usuario"/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>Email</Label>
            <Col sm={9}>
              <Input  name="email"  value={email}  onChange={this.onChange}  type="text"  placeholder="Correo Electronico"/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>Contraseña</Label>
            <Col sm={9}>
              <Input   name="passwordOne"   value={passwordOne}   onChange={this.onChange}   type="password"   placeholder="Password" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>Repetir Contraseña</Label>
            <Col sm={9}>
              <Input  name="passwordTwo"   value={passwordTwo}   onChange={this.onChange}   type="password"   placeholder="Confirm Password"/>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 9, offset: 3 }}>
              <Button disabled={isInvalid}  type="submit">Registrate</Button>
            </Col>
          </FormGroup>
  

          {error && <Alert className="text-center mt-2" color="danger"> {error.message}</Alert>}


        </Form>
      
      
      </Col>
    </Row>
    );
  }
}

const SignUpLink = () => (
  <p>
    No tienes una cuenta aun? <Link to={ROUTES.SIGN_UP}>Registrate</Link>
  </p>
);


const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default Registro;
export { SignUpForm, SignUpLink };