import React,{Component} from 'react';
import {  Row, Col } from 'reactstrap';
import CambiarPass from './Cambiarpass';
import ResetPass from '../ContraseniaOlvidada/ResetPass'
import { AuthUserContext } from '../Session/Session';
import { withAuthorization } from '../Session/Session';

class Cuenta extends Component {

render() {
    return (
        <div className="cuenta">
              
             
  

            <Row className="mt-3">
                <Col sm={6}>
                    <h1>Editar perfil</h1>
                    <CambiarPass />
                    
                    <ResetPass />
                    
                </Col>
            
                <Col sm={6}>
                    <h1>Datos Actuales</h1>
                    <br/>
                    <p>Email: {this.props.user.email} </p>
                </Col>

            </Row>
        </div>
    );
}
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Cuenta);