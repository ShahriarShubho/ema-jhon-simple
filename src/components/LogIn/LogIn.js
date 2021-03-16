import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const LogIn = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSingIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    success: false,
  });
  const [logInUser, setLogInUser] = useContext(userContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSingIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const singInUser = {
          isSingIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        // console.log(displayName, email, photoURL);
        setUser(singInUser);
      })
      .catch((error) => console.log(error.message));
  };

  const handleSingOut = () => {
    firebase
      .auth()
      .signOut()
      .then((result) => {
        const userSingOut = {
          isSingIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(userSingOut);
      })
      .catch((error) => console.log(error.message));
  };

  const handleChange = (event) => {
    let isValidForm = true;

    if (event.target.name === "email") {
      isValidForm = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid);
    }
    if (event.target.name === "password") {
      // use the following script for min 8 letter password, with at least a symbol, upper and lower case letters and a number
      const validType = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      isValidForm = validType.test(event.target.value);
      // console.log(isPasswordValid)
    }
    if (isValidForm) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleForm = (event) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserInfo(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLogInUser(newUserInfo);
          history.replace(from);
          console.log("sign in user ", res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    event.preventDefault();
  };

  const updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("update success");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const { name, email, photo } = user;
  return (
    <div className="App">
      {user.isSingIn ? (
        <button onClick={handleSingOut}>sign out</button>
      ) : (
        <button onClick={handleSingIn}>sign In</button>
      )}
      {user.isSingIn && (
        <div>
          <h4>{name}</h4>
          <p>{email}</p>
          <img src={photo} alt="" />
        </div>
      )}
      <h1>Our log in form</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Register</label>
      <form onSubmit={handleForm}>
        {newUser && (
          <input
            onBlur={handleChange}
            name="name"
            placeholder="Enter Your name"
            type="text"
          />
        )}
        <br />
        <input
          onBlur={handleChange}
          type="email"
          name="email"
          placeholder="Enter You Email"
          id=""
          required
        />
        <br />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Enter You Password"
          id=""
          required
        />
        <br />
        <input type="submit" value={newUser ? "sign up" : "sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          user {newUser ? "creat" : "Log in"} success
        </p>
      )}
    </div>
  );
};

export default LogIn;
