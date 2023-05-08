import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotFound from './pages/NotFound';
import Video from './pages/Video';
import Home from './pages/Home';
import SingIn from './pages/SingIn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home type="random" />,
      },
      { path: "/trends", element: <Home type="trend"/> },
      { path: "/subscriptions", element: <Home type="sub"/> },
      { path: "/signin", element: <SingIn/> },
      { path: "/videos", element: <Home/> },
      { path: "/videos/:keyword", element: <Home /> },
      { path: "/videos/watch/:videoId", element: <Video /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
