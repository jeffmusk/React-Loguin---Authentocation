import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as firebase from 'firebase';



const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.firestoreDb = app.firestore();
  }
// *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

     // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
     this.auth.onAuthStateChanged(authUser => {
        if (authUser){
          this.userId(authUser.uid).get()
            .then(snapshot => {
              const dbUser = snapshot.data();


              // default Rol vacio
              if(!dbUser.roles){
                dbUser.roles = {}
              }

              //Fucionar Usuario autenticado de firebase con el de Firestore
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                ...dbUser,
              };

              next(authUser);
            });
        }else{
          fallback();
        }

      }
     
    );


      // *** User API ***

  userId = (uid) => this.firestoreDb.collection("users").doc(uid) ;
  users = () => this.firestoreDb.collection("users");

}


export default Firebase ;
