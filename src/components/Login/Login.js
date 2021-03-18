import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Firebase-config";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (firebase.apps.length===0) {
  firebase.initializeApp(firebaseConfig);
}
const Login = () => {
  const [logInUser, setLogInUser] = useContext(UserContext);
  const history=useHistory();
  const location=useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  function handleGoogleSignIn() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((response) => {
        const { displayName, email } = response.user;
        //console.log(response.user);
        const signedInUser = { name:displayName, email };
        setLogInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        console.log(errorMessage, errorCode, email);
      });
  }
  return (
    <div>
      <h1> Login</h1>
      <button
        style={{
          backgroundColor: "tomato",
          height: "40px",
          color: "white",
          fontSize: "20px",
          textAlign: "center",
        }}
        onClick={handleGoogleSignIn}
      >
        Google Sign In
      </button>
    </div>
  );
};

export default Login;
