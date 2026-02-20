import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', data);
        setWorkouts(data.results ? data.results : data);
      });
  }, [endpoint]);

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Workouts</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Suggested For</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No workouts found.</td>
              </tr>
            ) : (
              workouts.map((workout, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{workout.name}</td>
                  <td>{workout.description}</td>
                  <td>{workout.suggested_for}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Workouts;
