import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Home from '../Pages/Dashboard/Home';
import Transactions from '../Pages/Dashboard/Transactions';
import SendMoney from '../Pages/Dashboard/SendMoney';
import CashIn from '../Pages/Dashboard/CashIn';
import CashOut from '../Pages/Dashboard/CashOut';
import Register from '../Pages/Register/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/dashboard/transactions',
        element: <Transactions></Transactions>,
      },
      {
        path: '/dashboard/sendMoney',
        element: <SendMoney></SendMoney>,
      },
      {
        path: '/dashboard/cashin',
        element: <CashIn></CashIn>,
      },
      {
        path: '/dashboard/cashOut',
        element: <CashOut></CashOut>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register></Register>,
  },
]);

export default router;
