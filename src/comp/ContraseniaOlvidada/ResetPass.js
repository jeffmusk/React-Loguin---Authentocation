import React,{Component} from 'react';
import {  Button,Modal, ModalHeader, ModalBody, ModalFooter,Form, Label ,Input ,FormGroup} from 'reactstrap';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  email: '',
  error: null,
};

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      ...INITIAL_STATE
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

      console.log("Mensaje Emviado");
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

    render() {
      const { email, error } = this.state;
      const isInvalid = email === '';

        return (
          <div className="reset">
            <Button color="secundary" onClick={this.toggle}>Olvide mi contraseña</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Recuperar contraseña</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="exampleEmail">Correo Electronico</Label>
                    <Input name="email"    value={this.state.email}    onChange={this.onChange}     type="text"    placeholder="Email con el que creo la cuenta" />
                  </FormGroup>
                <Button color="primary" disabled={isInvalid} type="submit" onClick={this.toggle}>Restablecer contraseña</Button>{' '}
                </Form>
               {error && <p>{error.message}</p>}
              </ModalBody>
              <ModalBody>
                Te enviaremos un email para restablecer tu contraseña
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>

          </div>
        );
    }
}

const FormReset = withFirebase(ResetPass);
export default  FormReset;
