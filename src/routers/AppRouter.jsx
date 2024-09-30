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
import MessagesPage from 'src/pages/MessagesPage';
import MessageDetailPage from 'src/pages/MessageDetailPage';

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
            <Route path="/" loader={() => redirect('/messages')} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/messages/:msgId" element={<MessageDetailPage />} />
          </Route>
        </Route>
        <Route element={<Public />} errorElement={<Error />} loader={async () => {
          const tokenData = await tokenLogin();
          return { tokenData };
        }}>
          <Route path="/senderLogin" element={<LoginPage />} />
          <Route path="/recipLogin" element={<LoginPage />} />
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