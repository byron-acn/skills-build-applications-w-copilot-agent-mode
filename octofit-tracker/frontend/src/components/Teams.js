import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespaceName}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams endpoint:', endpoint);
        console.log('Fetched teams:', data);
        setTeams(data.results ? data.results : data);
      });
  }, [endpoint]);

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Teams</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">No teams found.</td>
              </tr>
            ) : (
              teams.map((team, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Teams;
