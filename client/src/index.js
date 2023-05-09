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
import { Provider } from 'react-redux';
import { store,persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'


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
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router} />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
