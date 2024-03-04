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
  return <div>Hello</div>;
};

export default DisplayVideo;
