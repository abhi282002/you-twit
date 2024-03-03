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

  if (!VideosArray) {
    console.log("ret");

    return <div>Hello</div>;
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <Box display="grid" gridTemplateAreas="repeat(12, 1fr)" gap={2}>
        {VideosArray &&
          VideosArray.map((video) => (
            <Box key={video.id} gridColumn="span 8">
              <Item className="lg:w-[370px] h-[250px]">
                <ReactPlayer
                  url={video?.videoFile?.url}
                  light={video?.thumbnail?.url}
                  playing
                  width="100%"
                  height="100%"
                  controls={false}
                />
              </Item>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default DisplayVideo;
