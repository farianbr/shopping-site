import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../../firebase/firebase.init";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (event) => {

    // // const mainElement = event.target
    // const email = document.getElementById('formBasicEmail').value
    // const name = document.getElementById('formBasicName').value
    // const password = document.getElementById('formBasicPassword').value
    console.log("this is event", event.target);
    event.preventDefault();
    setEmail(event.target.formBasicEmail.value);
    setPassword(event.target.formBasicPassword.value);
    setName(event.target.formBasicName.value);
    setSuccess(false);
    setTimeout(() => console.log(name, email, password), 5000);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        userCredential.user.displayName = name;
        event.target.reset();
        setError("");
        setSuccess(true);
      })
      .catch((error) => {
        console.log("this is error", error.message);
        setError(error.message);
        event.target.reset();
        setSuccess(false);
      });
  };

  const handleGoogleSignIn = (event) => {
    setSuccess(false);
    console.log(event.target);
    signInWithPopup(auth, provider)
      .then((result) => {
        setSuccess(true);
        console.log(result.user);
      })
      .catch((err) => {
        setSuccess(false);
        setError(err.message);
      });
  };
  console.log("render from main function", name, email, password);
  return (
    <div className="w-50 mx-auto">
      <h1 className="text-center">Please Register Here!</h1>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Enter Name" />
          {/* <Form.Control type="text" placeholder="Enter Name" /> */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
          {/* <Form.Control type="email" placeholder="Enter email" /> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
          {/* <Form.Control type="password" placeholder="Password" /> */}
        </Form.Group>
        {success && <p className="text-success">Registered Successfully!</p>}
        {error !== "" && <p className="text-danger">{error}</p>}

        <Button variant="primary" type="submit" className="w-50">
          Register
        </Button>
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="btn btn-secondary m-2"
        >
          Register with Google
        </button>
      </Form>
    </div>
  );
};

export default Register;
