import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProblemApi from "../../../api/problem.api";

const BasicInfo = ({ data }) => {
  return (
    <Card
      style={{
        width: "32%",
        padding: "1em",
        marginRight: "1%",
        marginBottom: "15px",
      }}
    >
      <Card.Img
        variant="top"
        src="https://cdn3.vectorstock.com/i/1000x1000/21/77/problem-solving-concept-banner-header-vector-23242177.jpg"
      />
      <Card.Body>
        <Card.Title>{data?.title}</Card.Title>
        <Card.Text>
          {data?.description.length > 100 ? (
            <p>{data?.description.slice(0, 100)}...</p>
          ) : (
            <p>{data?.description}</p>
          )}
        </Card.Text>
        <p style={{ color: "rgb(175 167 167)" }}>
          Time Created: {moment(data?.date).format("DD-MM-YYYY HH:mm:ss")}
        </p>
        <Link to={`/problem/${data._id}`}>
          <Button variant="primary">Resolve</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BasicInfo;
