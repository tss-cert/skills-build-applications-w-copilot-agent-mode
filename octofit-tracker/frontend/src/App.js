
import './App.css';
import logo from './assets/octofitapp-small.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

// Bootstrap modal example (for demonstration)
import { useState, useEffect } from 'react';

function WelcomeModal({ show, onClose }) {
  return (
    <div className={`modal fade${show ? ' show d-block' : ''}`} tabIndex="-1" role="dialog" style={{background: show ? 'rgba(0,0,0,0.5)' : 'none'}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Welcome to Octofit Tracker!</h5>
            <button type="button" className="close btn btn-outline-secondary" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <p>Track your fitness, join teams, and compete on the leaderboard!</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [showModal, setShowModal] = useState(true);
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('octofit-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
      localStorage.setItem('octofit-theme', dark ? 'dark' : 'light');
    } catch (e) {
      // ignore
    }
  }, [dark]);
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 rounded shadow">
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
            <img src={logo} alt="Octofit" className="App-logo-small" />
            Octofit Tracker
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
            </ul>
            <div className="d-flex align-items-center">
              <button className={`btn me-2 ${dark ? 'btn-outline-light' : 'btn-outline-secondary'}`} onClick={() => setDark(d => !d)} aria-pressed={dark}>
                {dark ? 'Light' : 'Dark'} Mode
              </button>
              <Link className="btn btn-outline-light" to="/">Home</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<div className="mt-5"><h1 className="display-4 text-center text-primary mb-4">Welcome to Octofit Tracker!</h1><p className="lead text-center">Track your fitness, join teams, and compete on the leaderboard!</p></div>} />
        </Routes>
        <WelcomeModal show={showModal} onClose={() => setShowModal(false)} />
      </div>
    </Router>
  );
}

export default App;
