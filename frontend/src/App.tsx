import React, { FC, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DisplayVideo from "./pages/DisplayVideo";
import UserContext from "./Store/UserContext";
import axios from "axios";
import Cookie from "js-cookie";
function App() {
  const getAccessToken = () => Cookie.get("accessToken");
  const accessToken = getAccessToken();
  console.log("acccess", accessToken);

  const header: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
  };
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
  useEffect(() => {
    getCurrentUser();
  }, []);
  const getCurrentUser = async () => {
    const response: any = await axios.get(
      "http://localhost:8000/api/v1/users/current-user",
      {
        headers: header,
        withCredentials: true,
      }
    );
    const { _id, avatar, coverImage, email, fullName, username } =
      response?.data?.data;
    setCurrentUser({
      id: _id,
      avatar: avatar,
      email: email,
      fullName: fullName,
      username: username,
      coverImage: coverImage,
    });
    console.log(currentUser?.id);
  };
  return (
    <UserContext.Provider
      value={{
        loggedInUser: {
          id: String(currentUser?.id) || "", // Provide a default value (empty string in this case)
          username: currentUser?.username || "",
          fullName: currentUser?.fullName || "",
          email: currentUser?.email || "",
          avatar: currentUser?.avatar || "",
          coverImage: currentUser?.coverImage || "",
        },
        headers: header,
      }}
    >
      <Router>
        <Routes>
          {/* Default layout for the root path */}
          <Route path="/" element={<DisplayVideo />}>
            {/* This is your default layout page */}
            {/* Child routes for the root path */}
            {/* Other child routes can be added here */}
          </Route>

          {/* Other top-level routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
