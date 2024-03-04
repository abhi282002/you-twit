import React, { FC, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DisplayVideo from "./pages/DisplayVideo";

import UserChannel from "./pages/UserChannel";

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

  return (
    <Router>
      <Routes>
        {/* Default layout for the root path */}
        <Route path="/" element={<DisplayVideo />}>
          {/* This is your default layout page */}
          {/* Child routes for the root path */}
          {/* Other child routes can be added here */}
        </Route>
        <Route path="/video/uploads" element={<UserChannel />} />
        {/* Other top-level routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
