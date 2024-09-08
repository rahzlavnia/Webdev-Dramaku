// routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login';
import Register from './views/register';
import DetailPage from './views/detail';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />, 
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/detail',
    element: <DetailPage />,
  },
]);

export default router;
