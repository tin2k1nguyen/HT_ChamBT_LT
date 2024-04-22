import { notification } from "antd";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiUser from "../../../api/user.api";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
    }
    setValidated(true);
    ApiUser.signup({
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      name: form.name.value,
    })
      .then(() => {
        navigate("/login");
        notification.success({
          message: "Register successful",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3 mt-4">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Sign Up</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="username"
                  placeholder="Enter username"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  required
                  type="email"
                  placeholder="Email"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  required
                  type="text"
                  placeholder="Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  required
                  type="password"
                  placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a password.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicRePassword">
                <Form.Label>Re-Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Re-Password"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter re-password.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
            <p>
              Have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
