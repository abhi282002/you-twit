import React, { useState } from "react";
import Header from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
const headers = {
  "Content-Type": "application/json",
};
const SignIn = () => {
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
                const response = await axios.post(
                  "http://localhost:8000/api/v1/users/login",
                  { email: email, password: password },
                  { headers, withCredentials: true }
                );
                console.log(response);
              }}
            />
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
