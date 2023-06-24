import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {continueWithGoogle, signInUserWithEmail} = useContext(AuthContext)

  const handleLogIn = (event) => {
    setSuccess(false);
    event.preventDefault();
    setEmail(event.target.formBasicEmail.value);
    setPassword(event.target.formBasicPassword.value);
    // console.log(email,password)

    signInUserWithEmail(email, password)
      .then((userCredential) => {
        //   console.log(userCredential);
        setSuccess(true);
        setError("");
        setEmail("")
        setPassword("")
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(false);
      });
  };

  const handleGoogleSignIn = () => {
    setSuccess(false);
    // console.log(event.target);
    continueWithGoogle()
      .then((result) => {
        setSuccess(true);
        setError("");
        // console.log(result.user);
      })
      .catch((err) => {
        setSuccess(false);
        setError(err.message);
      });
  };

  return (
    <div className="w-50 mx-auto">
      <h1 className="text-center mt-30">Please Login Here!</h1>
      <Form onSubmit={handleLogIn}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        {success && <p className="text-success">Logged in Successfully!</p>}
        {error !== "" && <p className="text-danger">{error}</p>}

        <Button variant="primary" type="submit">
          Log In
        </Button>
        <Button
          onClick={handleGoogleSignIn}
          className="m-2"
          variant="secondary"
          type="button"
        >
          Continue with Google
        </Button>
      </Form>
    </div>
  );
};

export default Login;
