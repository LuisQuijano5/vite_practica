import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        alert('¡Registro exitoso! Ya puedes iniciar sesión.');
        navigate('/login');
      } else {
        alert('Error: el usuario ya existe o los datos son inválidos.');
      }
    } catch (error) {
      alert('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="card-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre completo</label>
        <input 
          type="text" 
          placeholder="Ej Juan" 
          onChange={e => setName(e.target.value)} 
          required 
        />

        <label>Correo</label>
        <input 
          type="email" 
          placeholder="tu@email.com" 
          onChange={e => setEmail(e.target.value)} 
          required 
        />

        <label>Contraseña</label>
        <input 
          type="password" 
          placeholder="********" 
          onChange={e => setPassword(e.target.value)} 
          required 
        />

        <button type="submit">Registrarse</button>
      </form>
      
      <p className="footer-text">
        Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}