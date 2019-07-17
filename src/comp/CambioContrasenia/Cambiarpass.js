import React,{Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, Label ,Input ,FormGroup } from 'reactstrap';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
class CambiarPass extends Component {
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
    event.preventDefault();
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

    render() {

      const { passwordOne, passwordTwo, error } = this.state;

      const isInvalid =
        passwordOne !== passwordTwo || passwordOne === '';

        return (
            <div className="cambiarPass">
                <Button color="info" onClick={this.toggle}>Cambiar contraseña</Button>
                <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>Cambiar contraseña</ModalHeader>
                  <ModalBody>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for="exampleEmail">Ingresa la nueva contraseña</Label>
                      <Input  name="passwordOne"  value={passwordOne} onChange={this.onChange}   type="password"
                      placeholder="Nueva Contraseña" />
                    </FormGroup>
                    <FormGroup>
                      
                      <Input  name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password"
                        placeholder="Confirma Nueva Contraseña" />
                    </FormGroup>
                  <Button color="primary" disabled={isInvalid} type="submit" >Actualizar contraseña</Button>{' '}
                  </Form>
                   
                  </ModalBody>
                  <ModalFooter>
                    
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>

                </Modal>
                  {error && <p>{error.message}</p>}
            </div>
        );
    }
}

const FormCambiarPass = withFirebase(CambiarPass);
export default  FormCambiarPass;
