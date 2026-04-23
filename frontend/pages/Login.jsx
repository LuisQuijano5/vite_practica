import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (res.ok) {
      const data = await res.json();
      login(data.user); 
      navigate('/');    
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="card-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Correo electrónico</label>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        
        <label>Contraseña</label>
        <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
        
        <button type="submit">Entrar</button>
      </form>

      <p className="footer-text">
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}