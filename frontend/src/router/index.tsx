// src/router/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout   from '../App';
import Home        from '../pages/Home';
import Register    from '../pages/Register';
import LoginPage from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true,         element: <Home /> },
      { path: 'register',    element: <Register /> },
      { path: 'login',    element: <LoginPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
