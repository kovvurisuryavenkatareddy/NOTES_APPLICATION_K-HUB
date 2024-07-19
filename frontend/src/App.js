import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import the Header component
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import CreateNote from './components/CreateNote';
import UpdateNote from './components/UpdateNote';
import { RequireToken } from './components/Auth';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header/> 
        <div className="container" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <RequireToken>
                  <Profile />
                </RequireToken>
              }
            />
            <Route
              path="/create"
              element={
                <RequireToken>
                  <CreateNote />
                </RequireToken>
              }
            />
            <Route
              path="/update/:id"
              element={
                <RequireToken>
                  <UpdateNote />
                </RequireToken>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
