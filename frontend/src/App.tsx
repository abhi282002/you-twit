import React, { FC, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DisplayAllVideo from "./pages/DisplayAllVideo";
import DisplayVideo from "./pages/DisplayVideo";
import UserChannel from "./pages/UserChannel";
import Header from "./components/Header";
import Body from "./pages/Body";

function App() {
  interface User {
    // Define the properties of your user object
    id: number;
    fullName: string;
    username: string;
    coverImage: string;
    email: string;
    avatar: string;
    // Add other properties as needed
  }
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: "",
    username: "",
    fullName: "",
    email: "",
    avatar: "",
    coverImage: "",
  });
  const appRouter = createBrowserRouter([
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: (
            <>
              <DisplayAllVideo />
            </>
          ),
        },
        {
          path: "/video/uploads",
          element: <UserChannel />,
        },
        {
          path: "/watch/v/:id",
          element: <DisplayVideo />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;
