import React, { useState } from "react";
import InputBox from "../components/InputBox";
import Header from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { duration } from "@mui/material";
const headers = {
  "Content-Type": "multipart/form-data",
};
const SignUp = () => {
  const navigate = useNavigate();
  const notify = () => toast.loading("sign in");
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center  items-center">
        <div className="rounded-lg bg-white w-[360px] text-center p-2 h-max px-4">
          <Header label="Sign Up" />
          <SubHeading label={"Enter Your information to create account"} />
          <InputBox
            type="text"
            placeholder="Enter Your Name"
            label="FullName"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <InputBox
            type="text"
            placeholder="Enter a UserName"
            label="UserName"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <InputBox
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={"abhishek@gmail.com"}
            label={"Email"}
          />

          <InputBox
            type="text"
            placeholder="12345678"
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputBox
            type="file"
            placeholder="avatar"
            label="Upload Avatar File"
            onChange={(e) => {
              setAvatar(e.target.files ? e.target.files[0] : null);
            }}
          />

          <div className="pt-4">
            <Button
              onClick={async () => {
                const loadingToastId = toast.loading("SignUp Processing");
                try {
                  const response = await axios.post(
                    "http://localhost:8000/api/v1/users/register",
                    {
                      fullName: fullName,
                      username: username,
                      email: email,
                      password: password,
                      avatar: avatar,
                    },
                    { headers }
                  );

                  if (response.status == 200) {
                    toast.dismiss(loadingToastId);
                    toast.success("User SignUp Successfully");
                    navigate("/signin");
                  } else {
                    toast.dismiss(loadingToastId);
                    toast.error("Error While Processing Please Try Again", {
                      duration: 700,
                    });
                    return;
                  }
                } catch (err) {
                  toast.dismiss(loadingToastId);
                  toast.error("Error While Processing Please Try Again", {
                    duration: 700,
                  });
                  return;
                } finally {
                  toast.dismiss(loadingToastId);
                }
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label="Already have an account?"
            buttonText="Sign in"
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
