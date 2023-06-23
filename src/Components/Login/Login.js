import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { app } from "../../firebase/firebase.init";

const auth = getAuth(app)

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const [success,setSuccess] = useState(false)


    const handleLogIn = event => {
      setSuccess(false)
        event.preventDefault()
        setEmail(event.target.formBasicEmail.value)
        setPassword(event.target.formBasicPassword.value)
        console.log(email,password)
        
        signInWithEmailAndPassword(auth,email,password)
        .then(userCredential => {
          console.log(userCredential);
          setSuccess(true)
          setError("")
        })
        .catch(error => {
          console.log(error.message);
          setError(error.message)
          setSuccess(false)
        })

    }

  return (
    <div className="w-50 mx-auto">
      <h1 className="text-center mt-30">Please Login Here!</h1>
      <Form onSubmit={handleLogIn}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
        </Form.Group>

        {success && <p className="text-success">Logged in Successfully!</p>}
        {error !=="" && <p className="text-danger">{error}</p>}


        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default Login;
