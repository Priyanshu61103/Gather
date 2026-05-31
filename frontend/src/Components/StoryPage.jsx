import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router";
import { X } from "lucide-react";
import { Link } from "react-router";
import { useRef } from "react";
import { useSelector } from "react-redux";
const StoryPage = () => {
  const { id } = useParams();
  const [mediaData, setMediaData] = useState();
  const location = useLocation();
  const profileData = location.state.profile;
  const [progress, setProgress] = useState(0);
  const [viewStory, setViewStory] = useState(true);
  const videoRef = useRef(null);
  const getStory = async () => {
    try {
      const info = { _id: id };
      console.log(info);
      const response = await fetch(`/api/get-story`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!response) return;

      const data = await response.json();
      if (data.success) {
        console.log(data.result);
        setMediaData(data.result);
        if ((data.result).media_type != "video") progressBarHandler();
        return;
      }
    } catch (error) {
      alert("Error at StoryPage.jsx");
      console.log(error.message);
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getStory();
    };

    fetchData();
  }, []);

  const progressBarHandler = () => {
    let duration = 10000;
    let stepTime = 100;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += stepTime;
      setProgress((elapsed / duration) * 100);
    }, stepTime);

    const timer = setTimeout(() => {
      setViewStory(false);
      clearInterval(interval);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  };

  const videoHandler = () => {
    let duration = videoRef.current.duration * 1000;
    let stepTime = 100;
    let elapsed = 0;

    const timer = setTimeout(() => {
      setViewStory(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  };

  let viewStoryData;
  if (mediaData) {
    switch (mediaData.media_type) {
      case "text":
        viewStoryData = (
          <div className="text-white text-2xl mx-26 my-52 lg:m-52 flex justify-center">
            <h1>{mediaData.content}</h1>
          </div>
        );
        break;
      case "image":
        viewStoryData = (
          <div className="relative flex justify-center w-full bottom-28 z-0">
            <img src={mediaData.media_url} alt="#" className="h-screen" />
          </div>
        );
        break;
      case "video":
        viewStoryData = (
          <div className="h-screen w-full flex justify-center relative bottom-28 z-0">
            <video
              ref={videoRef}
              src={mediaData.media_url}
              onLoadedMetadata={videoHandler}
              alt="#"
              autoPlay
            />
          </div>
        );
        break;
      default:
        break;
    }
  }

  return (
    <div className="overflow-hidden">
      {viewStory && (
        <div>
          <div
            className="h-auto w-full font-semibold"
            style={
              mediaData && mediaData.media_type == "text"
                ? { backgroundColor: mediaData.background_color }
                : { backgroundColor: "black" }
            }
          >
            <div className="h-screen w-full">
              <div>
                <div className="flex-1 h-1 w-full bg-gray-300">
                  {mediaData && mediaData.media_type != "video" && (
                    <div
                      className="bg-white h-full transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    ></div>
                  )}
                </div>
                <div className="h-20 w-full flex justify-between items-center m-5">
                  <div
                    className="h-12 min-w-44 lg:h-20 lg:min-w-52 text-white border-2 border-white rounded-xl flex justify-center items-center gap-x-3 z-20"
                    style={{ backgroundColor: "rgb(39, 39, 39)" }}
                  >
                    {profileData && (
                      <img
                        src={profileData.profile_picture}
                        alt=""
                        className="h-6 w-6 lg:h-10 lg:w-10 rounded-full"
                      />
                    )}
                    {profileData && <h1 className="text-sm lg:text-md">{profileData.full_name}</h1>}
                  </div>
                  <div className="mr-16 lg:mr-10 z-20">
                    <Link to="/">
                      <X color="white" size={28} />
                    </Link>
                  </div>
                </div>
                {viewStoryData}
              </div>
            </div>
          </div>
        </div>
      )}
      {!viewStory && <Navigate to="/" />}
    </div>
  );
};

export default StoryPage;
