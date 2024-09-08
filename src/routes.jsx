import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login';
import Register from './views/register';
import DetailPage from './views/detail';
import Home from './views/home';
import SearchResult from './views/searchResult';  
import DefaultLayout from './components/base';  

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchResult />,
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
    path: '/home',
    element: <DefaultLayout><Home /></DefaultLayout>,  
  },
  {
    path: '/detail',
    element: <DetailPage />
  },
  {
    path: '/search',
    element: <DefaultLayout><SearchResult /></DefaultLayout>
  },
]);

export default router;
