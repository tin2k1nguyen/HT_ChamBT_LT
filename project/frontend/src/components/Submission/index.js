import moment from "moment";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function SubmissionTable({ dataSubmission }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Problem</th>
          <th>Languge</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {dataSubmission?.map((submission, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{moment(submission?.date).format("DD-MM-YYYY HH:mm:ss")}</td>
            <td>{submission?.problem?.title || "Problem is deleted"}</td>
            <td>{submission?.language}</td>
            <td>
              <Link
                to={`/submission/${submission._id}`}
                state={{ code: submission?.code }}
              >
                <Button>View Detail</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SubmissionTable;
