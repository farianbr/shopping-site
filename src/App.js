import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Shop from './Components/Shop/Shop';
import Review from './Components/Review/Review';
import Main from './Components/Layout/Main';
import Payment from './Components/Payment/Payment';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register/Register';
import PrivateRoute from './Components/Layout/PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Shop></Shop>
        },
        {
          path: '/shop',
          element: <Shop></Shop>
        },
        {
          path: '/orders',
          element: <Review/>
        },
        {
          path: '/payment',
          element: <PrivateRoute><Payment></Payment></PrivateRoute>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
