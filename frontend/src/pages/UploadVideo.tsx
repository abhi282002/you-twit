import React, { useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useAppDispatch } from "../store/hook";
import { UploadVideoThunk } from "../store/Slices/videoSlices";

const UploadVideo = () => {
  interface VideoUpload {
    title: string;
    description: string;
    thumbnail: File | "";
    videoFile: File | "";
  }
  const dispatch = useAppDispatch();
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
    <div>
      <div>
        <InputBox
          type="text"
          value={videoState.title}
          name="title"
          label="title"
          onChange={handleVideoState}
          placeholder="Enter Title of Video"
        />
        <label htmlFor="desc">Enter Description Of Video</label>
        <textarea
          typeof="text"
          id="desc"
          name="description"
          placeholder="enter the description of the Video"
          className="bg-transparent px-3 py-1 resize-none h-36 overflow-y-scroll border"
          onChange={handleVideoState}
          value={videoState.description}
        />
        <label htmlFor="thumbnail">Upload Thumbnail</label>
        <input
          type="file"
          id="thumbnail"
          name="thumbnail"
          onChange={(e: any) => {
            handleFileChange(e, "thumbnail");
          }}
        />
        <label htmlFor="videoFile">Upload Video</label>
        <input
          type="file"
          id="videoFile"
          name="videoFile"
          onChange={(e: any) => {
            handleFileChange(e, "videoFile");
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
    </div>
  );
};

export default UploadVideo;
