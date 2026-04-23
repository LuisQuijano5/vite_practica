import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '10px', background: '#eee' }}>
      {user ? (
        <>
          <Link to="/">Dashboard</Link>
          <Link to="/profile">Perfil</Link>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Signup</Link>
        </>
      )}
    </nav>
  );
}