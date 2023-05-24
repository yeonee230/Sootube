import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotFound from './pages/NotFound';
import Video from './pages/Video';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store,persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';



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
      { path: "/signin", element: <SignIn/> },
      { path: "/signup", element: <SignUp/> },
      { path: "/videos", element: <Home/> },
      { path: "/search", element: <Search /> },
      { path: "/videos/:videoId", element: <Video /> },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router} />
    </PersistGate>
    </Provider>

);

