import React,{Component} from 'react';
import { withRouter} from 'react-router-dom';
import * as ROUTES from '../../Constantes/routes';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { Col, Button, Form, FormGroup, Label, Input, Row, Alert } from 'reactstrap';
import { SignUpLink } from '../Registro/Registro';
import ResetPass from '../ContraseniaOlvidada/ResetPass'
import { Loanding } from '../Loanding/Loanding';


const Login = () => (
    <div>
      <h1 className="text-center mt-5">Iniciar Sesion</h1>
      <SignInForm />
      
    </div>
  );

  const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    error: null,
  };
  class SignInFormBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE,loanding: false, };
    }
  
    onSubmit = event => {
      const { email, password } = this.state;
      this.setState({loanding: true})

      this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.setState({loanding: false})
          this.props.history.push(ROUTES.ACCOUNT);
        })
        .catch(error => {
          this.setState({ error });
          this.setState({loanding: false})
        });
        
    


      event.preventDefault();
    };
  
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
   
      
   
    render() {
      const { email, password, error } = this.state;
  
      const isInvalid = password === '' || email === '';

      if (this.state.loanding) {
        return (
          <Loanding />
        )
      }else{
        
return (
       <div>

        
       <Row className="mt-5">
           <Col sm={2} className=""></Col>
           <Col sm={8} className="">
            <Form onSubmit={this.onSubmit}>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={3}>Email</Label>
                        <Col sm={9}>
                            <Input  name="email"  value={email}  onChange={this.onChange} autocomplete="email"  type="text"  placeholder="Correo Electronico"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={3}>Contraseña</Label>
                        <Col sm={9}>
                         <Input   name="password"   value={password}   onChange={this.onChange}   type="password"  autocomplete="new-password"  placeholder="Contraseña" />
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 12, offset: 3 }}>
                        <Button disabled={isInvalid}  type="submit">Iniciar Sesion</Button>
                        </Col>
                    </FormGroup>
            </Form>

            
          {error && <Alert className="text-center mt-2" color="danger"> {error.message}</Alert>}
          
            <Row>
                <Col sm={10}  className="mt-3 text-center">
                 <SignUpLink />
                </Col>
                <Col sm={10}  className="mt-1 text-center">
                 <ResetPass />
                </Col>

                
            </Row>
           </Col>

       </Row>

       </div>
      );
    
    } // Final del else


    }
  }
  const SignInForm = compose(
    withRouter,
    withFirebase,
  )(SignInFormBase);

  
  export default Login;