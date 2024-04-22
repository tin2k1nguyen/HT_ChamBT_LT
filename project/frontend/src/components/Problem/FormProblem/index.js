import { Form, Input, notification, Space } from "antd";
import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import ProblemApi from "../../../api/problem.api";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
const FormProblem = ({ problem, refreshData, setRefreshData }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [listUsecase, setListUsecase] = useState(0);
  const handleShow = () => {
    setListUsecase(0);
    form.resetFields();
    form.setFieldsValue({
      ...problem,
    });
    setShow(true);
  };
  const onFinish = (values) => {
    if (problem) {
      ProblemApi.updateProblem(problem._id, values)
        .then((res) => {
          notification.success({
            message: "Update problem successfully",
          });
          setRefreshData(!refreshData);
          values?.testcase?.map((item) =>
            ProblemApi.createTestcaseOfProblem(problem._id, { ...item })
          );

          handleClose();
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message: "Update problem failed",
          });
        });
    } else
      ProblemApi.createProblem(values)
        .then((res) => {
          notification.success({
            message: "Create problem successfully",
          });
          values.testcase.map((item) =>
            ProblemApi.createTestcaseOfProblem(res.data._id, { ...item })
          );

          setRefreshData(!refreshData);

          handleClose();
        })
        .catch((err) => {
          notification.error({
            message: "Create problem failed",
          });
        });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();

  return (
    <>
      {problem ? (
        <Button onClick={handleShow}>Edit</Button>
      ) : (
        <Button onClick={handleShow}>Create</Button>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {problem ? (
              <p onClick={handleShow}>Edit Problem</p>
            ) : (
              <p onClick={handleShow}>Create Problem</p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            height: 500,
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
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <TextArea rows={10} />
            </Form.Item>
            <Form.List name="testcase">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space>
                      <Form.Item
                        {...field}
                        label="Input"
                        name={[field.name, "input"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing input",
                          },
                        ]}
                      >
                        <TextArea rows={3} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="Output"
                        name={[field.name, "output"]}
                        rules={[
                          {
                            required: true,
                            message: "Output",
                          },
                        ]}
                      >
                        <TextArea rows={3} />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add testcase
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Input</th>
                <th>Output</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {problem &&
                problem.testcases?.map((testcase, index) => (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{testcase.input}</td>
                      <td>{testcase.output}</td>
                      <td>
                        <Button
                          onClick={() => {
                            ProblemApi.deleteTestcaseOfProblem(
                              problem._id,
                              testcase._id
                            ).then(() =>
                              notification.success({
                                message: "Delete testcase successfully",
                              })
                            );
                          }}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </Table>
          {listUsecase > 0 &&
            Array.from(Array(listUsecase).keys()).map((usecase, index) => (
              <>
                <p>Testcase #{index + 1 + problem?.testcases?.length || 0}</p>
                <div className="form-group">
                  <label>Input</label>
                  <textarea
                    name="input"
                    className="form-control"
                    rows="3"
                    placeholder="Enter input"
                  ></textarea>
                  <label>Output</label>
                  <textarea
                    name="output"
                    className="form-control"
                    rows="3"
                    placeholder="Enter output"
                  ></textarea>
                </div>
              </>
            ))}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FormProblem;
