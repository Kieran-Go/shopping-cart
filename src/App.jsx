import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <Header cart = {cart} />
      <Outlet context={{ cart, setCart }} />
    </div>
  );
}
export default App;