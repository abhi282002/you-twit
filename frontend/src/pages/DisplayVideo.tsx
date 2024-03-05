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
      <div className="w-full h-full px-5 lg:px-12">
        <video
          src={videos.videoFile}
          poster={videos.thumbnail}
          className="object-fill h-[460px] w-[735px] lg:w-[900px] lg:h-[550px]  rounded-tl-lg w-full rounded-tr-lg"
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
