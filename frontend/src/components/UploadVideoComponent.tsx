import React, { useState } from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import { useAppDispatch } from "../store/hook";
import { IoCloudUploadSharp } from "react-icons/io5";
import Heading from "./Heading";
import { Tooltip } from "@mui/material";
import SubHeading from "./SubHeading";
import { UploadVideoThunk } from "../store/Slices/videoSlices";
const UploadVideo = ({ setOpen }: { setOpen: () => void }) => {
  interface VideoUpload {
    title: string;
    description: string;
    thumbnail: File | "";
    videoFile: File | "";
  }
  const dispatch = useAppDispatch();
  const [showtitleBox, setShowTitleBox] = useState<boolean>(false);

  const [videoState, setVideoState] = useState<VideoUpload>({
    title: "",
    description: "",
    thumbnail: "",
    videoFile: "",
  });

  const handleVideoState = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(videoState);

    const { name, value } = e.target;
    setVideoState((prev) => ({
      ...videoState,
      [name]: value,
    }));
  };
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const uploadFile = e?.target?.files[0] || null;
    setVideoState((prev) => ({
      ...prev,
      [type]: uploadFile,
    }));
  };

  return (
    <div className="w-[800px] bg-white h-[500px] m-auto shadow-2xl">
      <div className="pt-5">
        <div className="shadow pl-3 pr-6 flex justify-between border-b-2 pb-3">
          <Heading label="Upload videos" />
          <Tooltip title="Close" placement="left-start">
            <h1
              className="text-[20px] cursor-pointer"
              onClick={() => {
                setOpen();
              }}
            >
              X
            </h1>
          </Tooltip>
        </div>
        {!showtitleBox ? (
          <div className="w-full gap-5 flex flex-col justify-center items-center h-[350px]">
            <label
              htmlFor="videoFile"
              className="border shadow-md flex flex-col items-center"
            >
              <IoCloudUploadSharp className="w-[150px] h-[150px] cursor-pointer" />
              <SubHeading label="Drag and drop video files to upload" />
              <p>Your videos will be private until you publish them</p>
            </label>
            <div className="inline ">
              <input
                type="button"
                value={"SELECT FILE"}
                className="relative -right-1/3 bg-[#008CBA] text-[17px] px-[32px] py-[10px] text-white"
              />
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                className="opacity-0 relative -left-[40px]"
                onChange={(e: any) => {
                  handleFileChange(e, "videoFile");
                  setShowTitleBox((prev) => !prev);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="w-[350px] mt-4 m-auto">
            <InputBox
              type="text"
              value={videoState.title}
              name="title"
              label="Title"
              onChange={handleVideoState}
              placeholder="Title(required)"
            />
            <label htmlFor="desc">Enter Description Of Video</label>
            <textarea
              typeof="text"
              id="desc"
              name="description"
              placeholder="Tell Viewers about your video"
              className="w-[350px] px-3 py-2 outline-none border focus:border-blue-500  resize-none h-36 overflow-y-scroll"
              onChange={handleVideoState}
              value={videoState.description}
            />
            <label htmlFor="thumbnail" className="cursor-pointer">
              Upload Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="py-3 cursor-pointer"
              onChange={(e: any) => {
                handleFileChange(e, "thumbnail");
              }}
            />

            <Button
              label="Uploads"
              onClick={async () => {
                const res = await dispatch(UploadVideoThunk({ ...videoState }));
                console.log("Hi Hello");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadVideo;
