import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ApiUser from "../../../api/user.api";
import { selectUser, userAction } from "../../../store/user/userSlice";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthorized } = useSelector(selectUser);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
    }

    setValidated(true);
    ApiUser.login(
      event.target.elements.username.value,
      event.target.elements.password.value
    )
      .then((res) => {
        if (res) {
          localStorage.setItem("compileTokenApp", res.data.accessToken);
          dispatch(userAction.login());
          ApiUser.loadCurrentUser().then((res) => {
            dispatch(userAction.setUserInfo(res.data));
          });
          notification.success({
            message: "Login success",
            description: "Login success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Login failed",
          description: "Username or password is incorrect",
        });
      });
  };

  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized]);

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3 mt-4">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Login</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter username"
                  name="username"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  name="password"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your password
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Remember Me"
                  name="rememberMe"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
