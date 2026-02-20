import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard endpoint:', endpoint);
        console.log('Fetched leaderboard:', data);
        setLeaderboard(data.results ? data.results : data);
      });
  }, [endpoint]);

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Leaderboard</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">No leaderboard data found.</td>
              </tr>
            ) : (
              leaderboard.map((entry, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{entry.team?.name || entry.team}</td>
                  <td>{entry.points}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Leaderboard;
