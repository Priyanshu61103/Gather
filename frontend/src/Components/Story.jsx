import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { switchOff, switchOn } from "../Redux/Slice/storySlice";
import CreateStory from "./CreateStory";
import { useNavigate } from "react-router";
import StoryPage from "./StoryPage";
import { PlusCircle, PlusCircleIcon } from "lucide-react";

const Story = () => {
  const storyButton = useSelector((state) => state.storyButton.value);
  const profileData = useSelector((state) => state.profileData.value);
  const [storyData, setStoryData] = useState([]);
  const [usersProfile, setUsersProfile] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newStoryCreator = () => {
    if (storyButton) dispatch(switchOff());
    else dispatch(switchOn());
  };

  const storyHandler = (id, index) => {
    navigate(`/story-page/${id}`, { state: { profile: usersProfile[index] } });
  };

  const getUsersData = async (arr) => {
    const profileArr = arr.map(async (info) => {
      try {
        const response = await fetch(
          `/api/profile`,
          {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ email: info.user }),
            headers: {
              "content-type": "application/json",
            },
          },
        );

        if (!response) return null;

        const data = await response.json();
        if (data.success) {
          return data.result[0];
        }
      } catch (error) {
        alert("Error while Fetching Profile at StoryPage.jsx");
        console.log(error.message);
        return null;
      }
    });
    // Promise.all will maintain order of all asynchronous statements
    const profileArr2 = await Promise.all(profileArr);
    setUsersProfile(profileArr2);
  };

  const getStoriesData = async () => {
    try {
      const response = await fetch(
        `/api/get-story-data`,
        {
          credentials: "include",
        },
      );

      if (!response) return;

      const data = await response.json();
      if (data.success) {
        let arr = data.result;
        arr.reverse();
        setStoryData(arr);
        getUsersData(arr);
      }
    } catch (error) {
      alert("Error");
      console.log(error.message);
    }
  };
  useEffect(() => {
    getStoriesData();
  }, []);

  return (
    <div className="z-0">
      <div className="h-44 lg:h-[260px] lg:w-[660px] container flex gap-x-8 lg:gap-x-4 z-0">
        <div className="flex items-stretch justify-stretch">
          <div
            onClick={newStoryCreator}
            className="h-44 w-32 lg:h-56 lg:w-44 rounded-2xl flex justify-center items-center border-4 border-dashed border-black"
          >
            <div>
              <img
                src="https://ik.imagekit.io/priyanshu61103/plus-icon-2.png"
                alt=""
                className="h-14 w-14 ml-4"
              />
              <h1 className="font-bold font-sans">Create Story</h1>
            </div>
          </div>
        </div>

        <div className="flex w-40 lg:w-auto gap-x-8 lg:gap-x-4 relative bottom-4">
          {storyData.map((data, index) => (
            <div onClick={() => storyHandler(data._id, index)} key={data._id}>
              <div className="text-white text-xs relative top-40 left-16 lg:top-52 lg:left-24 z-40.....">
                <p>{moment(data.createdAt).fromNow()}</p>
              </div>

              <div
                className="h-44 w-32 lg:h-56 lg:w-44 rounded-2xl border-4 border-black bg-cover bg-center"
                style={
                  data.media_type == "text"
                    ? { backgroundColor: `${data.background_color}` }
                    : { backgroundColor: "black" }
                }
              >
                <div className="w-36 relative top-20 lg:top-24 z-10">
                  {data.media_type == "text" && (
                    <p className="text-white text-xl mx-6 lg:mx-12 truncate">
                      {data.content}
                    </p>
                  )}
                </div>
                <div>
                  {data.media_type == "image" && (
                    <img
                      src={data.media_url}
                      className="w-32 lg:w-44 h-[168px] lg:h-[215px] rounded-xl object-cover opacity-40 z-0......"
                    />
                  )}
                  {data.media_type == "video" && (
                    <video
                      src={data.media_url}
                      className="w-32 lg:w-44 h-[168px] lg:h-[215px] rounded-xl object-cover opacity-40 z-0......"
                    ></video>
                  )}

                  <div
                    className={
                      data.media_type != "text"
                        ? "relative bottom-[166px] lg:bottom-52 z-40....."
                        : "relative bottom-6 z-40....."
                    }
                  >
                    {usersProfile != [] && usersProfile[index] ? (
                      <img
                        src={usersProfile[index].profile_picture}
                        alt="#"
                        className="h-10 w-10 lg:h-14 lg:w-14 rounded-full border-2 lg:border-4 border-white m-4"
                      />
                    ) : (
                      <img
                        src="../profile-logo-2.png"
                        alt="#"
                        className="h-10 w-10 lg:h-14 lg:w-14 rounded-full border-2 lg:border-4 border-white m-4 bg-white"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Story;
