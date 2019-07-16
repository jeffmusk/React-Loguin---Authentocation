import React,{Component} from 'react';
import { withFirebase } from '../Firebase';
import SnapshotState from 'jest-snapshot/build/State';

class Admin extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          users: {},
        };
      }

    componentDidMount() {
      this.setState({loading: true});
      
      this.props.firebase.users().on('value', snapshot => {
        const usersObject = snapshot.val();
        const usersList = Object.keys(usersObject).map(key => ({
            ...usersObject[key],
            uid: key,
          }));

        this.setState({
            users:usersList,
            loading:false ,
        })
      } )
    }

    
      

    render() {
        const { users, loading } = this.state;

        return (
            <div className="Admin">
                <h1>Vista de Adminisitrador</h1>
                <UserList />
            </div>
        );
    }

    

     // Al desmontar el componente dejar de escuchar a firebase realdatabase
    componentWillUnmount() {
        this.props.firebase.users().off();
      }
    
}

const UserList = ({users}) => (
    <div className="usuarios">
        <h3>Lista deUsuarios</h3>
        <ul>
        { users != null ? users.map(user => (
        <li key={user.uid}>
            <span>
            <strong>ID:</strong> {user.uid}
            </span>
            <span>
            <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
            <strong>Username:</strong> {user.username}
            </span>
        </li>
        )) : <p>Sin Usuarios</p>}
        </ul>
    </div>
);



export default withFirebase(Admin);