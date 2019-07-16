import React,{Component} from 'react';
import {  Row, Col } from 'reactstrap';
import CambiarPass from './Cambiarpass';
import ResetPass from '../ContraseniaOlvidada/ResetPass'

export default class Cuenta extends Component {

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
                </Col>

            </Row>
        </div>
    );
}
}