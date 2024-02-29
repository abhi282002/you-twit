import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "../components/Header.";
import ReactPlayer from "react-player";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DisplayVideo = () => {
  const [allVideos, setAllVideos] = useState<Array<any>>([]);
  const getAccessToken = () => Cookie.get("accessToken");
  const accessToken = getAccessToken();
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  useEffect(() => {
    getAllVideos();
  }, []);

  const getAllVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/video", {
        headers,
        withCredentials: true,
      });
      console.log(response.data.data?.docs); // Make sure to access the 'data' property of the response
      setAllVideos(response.data?.data?.docs);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <Box display="grid" gridTemplateAreas="repeat(12, 1fr)" gap={2}>
        {allVideos.map((video) => (
          <Box gridColumn="span 8">
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
