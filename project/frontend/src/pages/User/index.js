import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import ApiUser from "../../api/user.api";
import UserTable from "../../components/User";
import FormUser from "../../components/User/FormUser";

const User = () => {
  const [show, setShow] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    ApiUser.getAllUsers()
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <h1>User</h1>
      <Card>
        <Card.Header as="h5">
          <Row>
            <Col>List all User</Col>
            <Col style={{ display: "flex", justifyContent: "flex-end" }}>
              <FormUser />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <UserTable dataUser={dataUser} />
        </Card.Body>
      </Card>
    </>
  );
};

export default User;
