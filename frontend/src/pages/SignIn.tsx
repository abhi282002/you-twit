import React, { useState } from "react";
import Header from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const headers = {
  "Content-Type": "application/json",
};
const SignIn = () => {
  const navigate = useNavigate();
  const notify = () => toast.loading("sign in");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-[360px] text-center p-2 h-max px-4">
          <Header label={"SignIn"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            type="text"
            placeholder={"abhishek@gmail.com"}
            label={"Email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            type="text"
            placeholder={"123456"}
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={"SignIn"}
              onClick={async () => {
                const loadingToastId = toast.loading("Loading......");
                try {
                  const response = await axios.post(
                    "http://localhost:8000/api/v1/users/login",
                    { email: email, password: password },
                    { headers, withCredentials: true }
                  );
                  if (response.status == 200) {
                    toast.success("User Login Successfully");
                    console.log(response);
                    navigate("/");
                  } else {
                    toast.dismiss(loadingToastId);
                    console.log("Error:", response.statusText);
                    toast.error("Error While Processing Please Try Again", {
                      duration: 700,
                    });
                    return;
                  }
                } catch (error: any) {
                  toast.dismiss(loadingToastId);
                  toast.error("Error While Processing Please Try Again", {
                    duration: 700,
                  });
                  console.error("ERROR: ", error.message);
                  return;
                } finally {
                  toast.dismiss(loadingToastId);
                }
              }}
            />
            <Toaster />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"SignUp"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
