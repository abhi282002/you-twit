import { createContext, ReactNode } from "react";

interface User {
  id: string;
  avatar: string;
  username: string;
  email: string;
  fullName: string;
  coverImage: string;
}

interface UserContextProps {
  loggedInUser: User;
  headers: Record<string, string>;
}

const defaultUser: User = {
  id: "",
  avatar: "",
  username: "",
  email: "",
  fullName: "",
  coverImage: "",
};

const defaultHeaders: Record<string, string> = {};

const UserContext = createContext<UserContextProps>({
  loggedInUser: defaultUser,
  headers: defaultHeaders,
});

export default UserContext;
