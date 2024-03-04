import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { RootState } from "../store/store";
import { AllVideos } from "../store/Slices/videoSlices";
import Shimmer from "../components/Shimmer";
import { formatTimeDifference } from "../config/formateTime";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
let allVideos: any;
const DisplayAllVideo = () => {
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
      <div className="pl-5 pr-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {VideosArray
          ? VideosArray.map((video: any) => (
              <Link key={video?._id} to={`/watch/v/${video?._id}`}>
                <div className="relative h-[265px] w-[360px] shadow-xl ">
                  <div className="h-[200px] w-full">
                    <ReactPlayer
                      url={video?.videoFile?.url}
                      light={video?.thumbnail?.url}
                      playing
                      width="100%"
                      height="100%"
                      controls={false}
                    />
                  </div>
                  <div className="pl-2 pt-2 relative line-clamp-4">
                    <div className="flex flex-col">
                      <div className="flex">
                        <Avatar
                          alt={video?.owner[0]?.fullName}
                          src={video?.owner[0]?.avatar}
                        />
                        <h3 className="pl-1 text-[14px]">
                          {video?.description}
                        </h3>
                      </div>
                      <div className="relative bottom-2">
                        <p className="text-[12px] pl-10">
                          {`${video?.owner[0]?.fullName} . ${
                            video?.views
                          } views . ${formatTimeDifference(video?.createdAt)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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

export default DisplayAllVideo;
