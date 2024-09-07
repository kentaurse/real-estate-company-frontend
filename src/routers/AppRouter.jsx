import React from 'react';
import {
  Route,
  redirect,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import axios from 'axios';
import { ThemeProvider } from 'src/components/Theme';
import { tokenLogin } from 'src/components/TokenLogin';
import App from 'src/App';
import Public from 'src/routers/Public';
import Private from 'src/routers/Private';
import Error from 'src/components/Error';
import LoginPage from 'src/pages/LoginPage';
import RegisterPage from 'src/pages/RegisterPage';
import DashboardPage from 'src/pages/DashboardPage';

import BuyPage from 'src/pages/BuyPage';
import ContactPage from 'src/pages/ContactPage';
import MyListPage from 'src/pages/MyListPage';
import OfficeSpacePage from 'src/pages/OfficeSpacePage';
import RentOutPage from 'src/pages/RentOutPage';
import RentPage from 'src/pages/RentPage';
import SellPage from 'src/pages/SellPage';

axios.defaults.baseURL = process.env.REACT_API_BASE_URL;

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<App />} errorElement={<Error />}>
          <Route element={<Private />} loader={async () => {
            const tokenData = await tokenLogin();
            return { tokenData };
          }}>
            <Route path="/" loader={() => redirect('/dashboard')} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/myList" element={<MyListPage />} />
            <Route path="/officeSpace" element={<OfficeSpacePage />} />
            <Route path="/rentOut" element={<RentOutPage />} />
            <Route path="/rent" element={<RentPage />} />
            <Route path="/sell" element={<SellPage />} />
          </Route>
        </Route>
        <Route element={<Public />} errorElement={<Error />} loader={async () => {
          const tokenData = await tokenLogin();
          return { tokenData };
        }}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        {/* <Route path="*" loader={() => redirect('/login')} /> */}
      </>
    )
  );

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default AppRouter;