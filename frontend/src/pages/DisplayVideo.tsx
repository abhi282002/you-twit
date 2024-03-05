import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hook";
import { GetVideoById } from "../store/Slices/videoSlices";
import { useAppSelector } from "../store/hook";
import { RootState } from "../store/store";
const DisplayVideo = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string | "" }>();
  const videos = useAppSelector((state: RootState) => state.video.OneVideo);
  useEffect(() => {
    fetchVideo();
  }, []);
  console.log("Videos", videos);

  const fetchVideo = async () => {
    const res = dispatch(GetVideoById({ id }));
  };
  return (
    <div>
      <div className="w-full px-4">
        <video
          src={videos.videoFile}
          className="object-fill  rounded-tl-lg w-full rounded-tr-lg"
          controls
          disablePictureInPicture
          controlsList="nodownload"
          muted
        ></video>
      </div>
    </div>
  );
};

export default DisplayVideo;
