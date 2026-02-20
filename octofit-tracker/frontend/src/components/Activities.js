import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespaceName}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities endpoint:', endpoint);
        console.log('Fetched activities:', data);
        setActivities(data.results ? data.results : data);
      });
  }, [endpoint]);

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Activities</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">No activities found.</td>
              </tr>
            ) : (
              activities.map((activity, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{activity.activity_type}</td>
                  <td>{activity.duration}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Activities;
