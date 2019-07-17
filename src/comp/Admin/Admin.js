import React,{Component} from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session/Session';
import * as ROLES from '../../Constantes/roles';
import { compose } from 'recompose';


class Admin extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: true,
          users: [],
        };
      }

    componentDidMount() {
      this.setState({loading: true});
        
    const unsubscribe =  this.props.firebase.users().onSnapshot( querySnapshot => {  
         var  actualUsers = querySnapshot.docs.map(doc => doc.data());
        this.setState({
            users:actualUsers,
            loading:false ,
          }) 
      
        }
      )
      /*
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
        */
    }

    
      

    render() {
        const { users, loading } = this.state;

        return (
            <div className="Admin">
                <h1>Vista de Adminisitrador</h1>
                <p>Acesible solo para Adminitradores</p>
                <UserList users={users} />
            </div>
        );
    }

    

     // Al desmontar el componente dejar de escuchar a firebase realdatabase
    componentWillUnmount() {
        
      }

    
}

const UserList = ({users}) => (
    <div className="usuarios">
        <h3>Lista de Usuarios</h3>
        <ul>
            {users.map(user =>  {
                    return(
                        <li>
                            <span>
                            <strong>ID:</strong> {user.id}
                            </span>
                            <span>
                            <strong>E-Mail:</strong> {user.email}
                            </span>
                            <span>
                            <strong>Username:</strong> {user.username}
                            </span>
                        </li>
                        
                    )
                }  
            )}
        </ul>
        {console.log(users)}
        
    </div>
);


const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withAuthorization(condition),
    withFirebase,
  )(Admin);
