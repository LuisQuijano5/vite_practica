import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      <p>Bienvenido, <strong>{user?.name}</strong></p>
      
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>Información actual:</h3>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}