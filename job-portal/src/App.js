import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import JobListingsPage from './pages/JobListings';
import AdminPage from './pages/Admin';
import ContactPage from './pages/Contact';
import CompanyShowcasePage from './pages/CompanyShowcase';
import Navbar from './components/Navbar/navbar';
import AdminNavbar from './components/Navbar/adminNavbar';
import AddJobPage from './pages/AddJob';
import { useSelector } from 'react-redux';

const App = () => {
  const { loggedIn, user } = useSelector(state => state.login);
  const userType = user ? user.user.type : null;

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={loggedIn ? <Navigate replace to="/home" /> : <LoginPage />} />
        </Routes>
      </div>
      {userType !== 'admin' &&
        <div>
          {loggedIn && <Navbar />}
          <Routes>
            <Route path="/home" element={loggedIn ? <HomePage /> : <Navigate replace to="/login" />} />
            <Route path="/about" element={loggedIn ? <AboutPage /> : <Navigate replace to="/login" />} />
            <Route path="/jobs" element={loggedIn ? <JobListingsPage /> : <Navigate replace to="/login" />} />
            <Route path="/contact" element={loggedIn ? <ContactPage /> : <Navigate replace to="/login" />} />
            <Route path="/showcase" element={loggedIn ? <CompanyShowcasePage /> : <Navigate replace to="/login" />} />
            <Route path="*" element={<Navigate to={loggedIn ? "/home" : "/login"} />} />
          </Routes>
        </div>
      }
      {userType === 'admin' && 
        <div>
          {loggedIn && <AdminNavbar />}
          <Routes>
            <Route path="/admin" element={loggedIn ? <AdminPage /> : <Navigate replace to="/login" />} />
            <Route path="*" element={<Navigate to={loggedIn ? "/admin" : "/login"} />} />
            <Route path="/addJobs" element={loggedIn ? <AddJobPage /> : <Navigate replace to="/login" />} />
          </Routes>
        </div>  
      }
    </Router>
  );
};

export default App;
