import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Heading from "./Heading";
import Button from "./Button";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/hook";
import { useAppDispatch } from "../store/hook";
import { logoutAccount } from "../store/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
export default function Header() {
  // Use type assertion to inform TypeScript about localStorage
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  const localStorage = window.localStorage as Storage;

  // Retrieve data from localStorage and parse it as JSON
  const data = localStorage.getItem("data");
  const imagesrc = data ? JSON.parse(data) : null;
  // Use a conditional operator to conditionally render the component
  return (
    <>
      <div className="flex justify-around items-center w-full mb-4 h-[80px] py-3 shadow-xl">
        <div className="w-3/12 pl-6 ">
          <CiMenuBurger
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          />
        </div>
        <div className="w-9/12 flex justify-end  pr-6  ml-6">
          <div className="w-[100px]">
            <Stack direction="row" spacing={2} className="pl-4">
              {imagesrc ? (
                <Link to={"/"}>
                  <Avatar alt={imagesrc.fullName} src={imagesrc?.avatar} />
                </Link>
              ) : (
                <Avatar alt="Remy Sharp" />
              )}
            </Stack>
          </div>
          <div className="w-32">
            {isLoggedIn ? (
              <Button
                label="Logout"
                onClick={async () => {
                  const res = await dispatch(logoutAccount());
                  console.log(res);

                  if (res?.payload?.success) {
                    console.log(res);
                    toast.success("Logout Successful");
                    navigate("/signin");
                  } else {
                    toast.error("Logout Unsuccessful! Please Try Again");
                  }
                }}
              />
            ) : (
              <Button
                label="SignIn"
                onClick={() => {
                  navigate("/signin");
                }}
              />
            )}
          </div>
        </div>
      </div>
     
    </>
  );
}
