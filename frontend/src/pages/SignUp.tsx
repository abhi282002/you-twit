import React, { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../store/Slices/AuthSlice";
import { useAppDispatch } from "../store/hook";
const headers = {
  "Content-Type": "multipart/form-data",
};
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarstr, setAvatarStr] = useState<string>("");
  
  
  interface signUpUserInput {
    fullName: string;
    username: string;
    email: string;
    password: string;
  }
  const [userInput, setUserInput] = useState<signUpUserInput>({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const handleUserInput = async (e: any) => {
    console.log(e.target);

    const { name, value } = e.target;
    console.log({ ...userInput, [name]: value });

    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [name]: value,
    }));
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center  items-center">
        <div className="rounded-lg bg-white w-[360px] text-center p-2 h-max px-4">
          <Heading label="Sign Up" />
          <SubHeading label={"Enter Your information to create account"} />
          <label htmlFor="image_uploads" className="cursor-pointer">
            {avatarstr ? (
              <img className="w-24 h-24 rounded-full m-auto" src={avatarstr} />
            ) : (
              <BsPersonCircle className="w-24 h-24 m-auto" />
            )}
          </label>
          <input
            type="file"
            className="hidden"
            id="image_uploads"
            placeholder="avatar"
            onChange={(e) => {
              const uploadFile = e.target?.files[0] || null;

              if (uploadFile) {
                setAvatar(e.target.files ? e.target.files[0] : null);
                const fileReader: any = new FileReader();
                fileReader.readAsDataURL(uploadFile);
                fileReader.addEventListener("load", function () {
                  setAvatarStr(fileReader?.result);
                });
              }
            }}
          />

          <InputBox
            type="text"
            placeholder="Enter Your Name"
            label="FullName"
            value={userInput.fullName}
            name="fullName"
            onChange={handleUserInput}
          />
          <InputBox
            type="text"
            placeholder="Enter a UserName"
            label="UserName"
            name="username"
            value={userInput.username}
            onChange={handleUserInput}
          />
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
              onClick={async () => {
                const response = await dispatch(
                  createAccount({ ...userInput, avatar: avatar })
                );
                console.log(response);

                if (response?.payload?.success) {
                  navigate("/signin");
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
