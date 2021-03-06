import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AuthUserContext from './Context';
import { withFirebase } from '../Firebase';
import  * as  ROUTES from '../../Constantes/routes'


const withAuthorization = condition => Component => {
class WithAuthorization extends React.Component {
    
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.HOME);
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN),
      );
       
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} user={authUser} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;