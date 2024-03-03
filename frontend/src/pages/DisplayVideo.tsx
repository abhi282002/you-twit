import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "../components/Header";
import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { RootState } from "../store/store";
import { AllVideos } from "../store/Slices/videoSlices";
import Shimmer from "../components/Shimmer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
let allVideos: any;
const DisplayVideo = () => {
  const videos = useAppSelector((state: RootState) => state.video.Videodata);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllVideos();
  }, []);

  const getAllVideos = async () => {
    try {
      allVideos = await dispatch(AllVideos());
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const VideosArray = videos?.docs;

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {VideosArray
          ? VideosArray.map((video) => (
              <div className="h-[220px] relative shadow-xl ">
                <ReactPlayer
                  url={video?.videoFile?.url}
                  light={video?.thumbnail?.url}
                  playing
                  width="100%"
                  height="100%"
                  controls={false}
                />
                <div className="absolute bottom-3 line-clamp-4 left-2">
                  <h3>{video?.description}</h3>
                </div>
              </div>
            ))
          : Array(12)
              .fill("")
              .map((e, index) => (
                <div className="flex flex-col" key={index}>
                  <div className=" w-60 h-40 border  bg-gray-200  text-black/100"></div>
                  <div className=" mt-4 ml-0.5 w-36 h-3 border-grey border-2 rounded-md bg-gray-200"></div>
                  <div className=" mt-4 ml-0.5 w-20 h-3 border-grey border-2 rounded-md bg-gray-200"></div>
                </div>
              ))}
      </div>
    </>
  );
};

export default DisplayVideo;
