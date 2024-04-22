import { notification } from "antd";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import ApiUser from "../../api/user.api";
import FormUser from "./FormUser";

function UserTable({ dataUser }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onHandleDelete = (id) => {
    ApiUser.deleteUser(id)
      .then((res) => {
        if (res) {
          notification.success({
            message: "Delete user successfully",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Name</th>
          <th>Roles</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {dataUser?.map((user, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.roles.join(", ")}</td>
            <td>
              <FormUser user={user} />
              <Button
                onClick={() => onHandleDelete(user._id)}
                style={{ marginLeft: 5, backgroundColor: "red" }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UserTable;
