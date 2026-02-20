

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
const logo = process.env.PUBLIC_URL + '/octofitapp-small.png';


function App() {
  return (
    <Router>
      <div className="App bg-light min-vh-100">
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand as={Link} to="/" className="octofit-logo-left">
              <Image src={logo} alt="Octofit Logo" width={48} height={48} rounded className="App-logo" />
              <span className="fw-bold fs-3 align-middle">Octofit Tracker</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/activities">Activities</Nav.Link>
                <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
                <Nav.Link as={Link} to="/teams">Teams</Nav.Link>
                <Nav.Link as={Link} to="/users">Users</Nav.Link>
                <Nav.Link as={Link} to="/workouts">Workouts</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={<Activities />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
