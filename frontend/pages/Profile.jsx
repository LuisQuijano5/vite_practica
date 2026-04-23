import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [newName, setNewName] = useState(user?.name || '');
  const [mensaje, setMensaje] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMensaje('Actualizando...');

    try {
      const res = await fetch('http://localhost:3000/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, newName })
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setMensaje('Perfil actualizado con exito');
      } else {
        setMensaje('Hubo un error al actualizar el perfil');
      }
    } catch (error) {
      setMensaje('Error de conexión con el servidor');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mi Perfil</h2>
      <p><strong>Email:</strong> {user?.email} (No editable)</p>
      
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={newName} 
          onChange={e => setNewName(e.target.value)} 
          required 
        />
        
        <button type="submit">Guardar Cambios</button>
      </form>

      {mensaje && <p style={{ marginTop: '15px', color: 'blue' }}>{mensaje}</p>}
    </div>
  );
}