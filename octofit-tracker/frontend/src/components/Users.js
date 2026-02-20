import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespaceName}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users endpoint:', endpoint);
        console.log('Fetched users:', data);
        setUsers(data.results ? data.results : data);
      });
  }, [endpoint]);

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Users</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No users found.</td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.team}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Users;
