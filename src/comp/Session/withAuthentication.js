import React from 'react';

import AuthUserContext from './Context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        loanding: true,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
           this.setState({ authUser , loanding:false });
           
          },() => {
            this.setState({authUser:null, loanding:false});
          },
      );
        
         
       
    }


    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}   >
          <Component {...this.props} loanding={this.state.loanding}  />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;