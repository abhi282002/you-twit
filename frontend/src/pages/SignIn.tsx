import React, { useState } from "react";
import Header from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useAppDispatch } from "../store/hook";
import { useNavigate } from "react-router-dom";
import { LoginAccount } from "../store/Slices/AuthSlice";
const headers = {
  "Content-Type": "application/json",
};
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  interface SignInInterface {
    email: string;
    password: string;
  }
  const [userInput, setUserInput] = useState<SignInInterface>({
    email: "",
    password: "",
  });
  const handleUserInput = (e: any) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-[360px] text-center p-2 h-max px-4">
          <Header label={"SignIn"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            type="text"
            onChange={handleUserInput}
            placeholder={"abhishek@gmail.com"}
            label={"Email"}
            name="email"
            value={userInput.email}
          />
          <InputBox
            type="text"
            placeholder="12345678"
            label="Password"
            name="password"
            onChange={handleUserInput}
            value={userInput.password}
          />
          <div className="pt-4">
            <Button
              label={"SignIn"}
              onClick={async () => {
                const res = await dispatch(LoginAccount(userInput));
                console.log(res);

                if (res?.payload?.success) {
                  navigate("/");
                }
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
