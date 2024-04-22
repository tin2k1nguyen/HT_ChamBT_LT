import { Form, Input, notification, Space } from "antd";
import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import ProblemApi from "../../../api/problem.api";
import ApiUser from "../../../api/user.api";
const FormUser = ({ user }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [listUsecase, setListUsecase] = useState(0);
  const handleShow = () => {
    setListUsecase(0);
    form.resetFields();
    form.setFieldsValue({
      ...user,
    });
    setShow(true);
  };
  const onFinish = (values) => {
    console.log(values);
    if (user) {
      ApiUser.updateUser(user._id, values)
        .then((res) => {
          notification.success({
            message: "Update user successfully",
          });

          handleClose();
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message: "Update user failed",
          });
        });
    } else
      ApiUser.signup(values)
        .then((res) => {
          notification.success({
            message: "Create user successfully",
          });

          handleClose();
        })
        .catch((err) => {
          notification.error({
            message: "Create user failed",
          });
        });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();

  return (
    <>
      {user ? (
        <Button onClick={handleShow}>Edit</Button>
      ) : (
        <Button onClick={handleShow}>Create</Button>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{user ? <p> Edit </p> : <p> Create </p>}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            height: 350,
          }}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Role"
              name="roles"
              rules={[
                {
                  required: true,
                  message: "Please input your role!",
                },
              ]}
            >
              <Input type="text" placeholder="admin or user" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: user ? false : true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FormUser;
