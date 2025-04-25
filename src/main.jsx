import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/normalize.css';
import './css/index.css';
import routes from './components/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);