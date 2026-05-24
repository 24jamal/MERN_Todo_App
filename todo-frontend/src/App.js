import './App.css';
import { useState, useEffect } from 'react';
import Todo from './components/Todo';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'register', or 'todos'
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setIsLoggedIn(true);
      setCurrentPage('todos');
      const userData = JSON.parse(user);
      setUserEmail(userData.email);
    } else {
      setIsLoggedIn(false);
      setCurrentPage('login');
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserEmail('');
    setCurrentPage('login');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('todos');
    const user = JSON.parse(localStorage.getItem('user'));
    setUserEmail(user.email);
  };

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('todos');
    const user = JSON.parse(localStorage.getItem('user'));
    setUserEmail(user.email);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
            <h1>Todo App</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ color: '#666' }}>Welcome, {userEmail}</span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  background: '#d32f2f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          </div>
          <Todo />
        </>
      ) : (
        <>
          {currentPage === 'login' ? (
            <Login onSwitchToRegister={() => setCurrentPage('register')} />
          ) : (
            <Register onSwitchToLogin={() => setCurrentPage('login')} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
