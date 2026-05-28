import React, { useEffect, useState } from "react";
import { dummyPostsData } from "../../assets/assets.js";
import moment from "moment";
import { Heart, MessageCircle, Share, Share2 } from "lucide-react";
import { Link } from "react-router";
import { Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Edit } from "lucide-react";
import ProfilePopUp from "./ProfilePopUp.jsx";
import { setUserData } from "../Redux/Slice/userDataSlice.js";
import { switchOff, switchOn } from "../Redux/Slice/commentSectionSlice.js";
import CommentSection from "./CommentSection.jsx";
import { switchOffShare, switchOnShare } from "../Redux/Slice/shareSlice.js";

const Posts = () => {
  let contentArray = [];
  let idArray = [];
  const [postData, setPostData] = useState([]);
  const [arr, setArr] = useState([]);
  const commentSection = useSelector((state) => state.commentSection.value);
  const share = useSelector((state) => state.share.value);
  const profileData = useSelector((state) => state.profileData.value);
  const editButton = useSelector((state) => state.editButton.value);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);

  const commentSectionHandler = (id) => {
    if (commentSection) dispatch(switchOff());
    else dispatch(switchOn(id));
  };

  const shareHandler = (id) => {
    if (share) dispatch(switchOffShare());
    else dispatch(switchOnShare(id));
  };
  
  const getUsersData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users-data`,
        {
          credentials: "include",
        },
      );
      if (!response) {
        alert("Error");
        return;
      }
      const data = await response.json();
      if (data.success) {
        let temp = [];
        dispatch(setUserData(data.result));
        data.result.forEach((info) => {
          idArray.forEach((itr, index) => {
            if (info.posts.includes(itr)) {
              temp[index] = info;
            }
          });
        });

        setArr(temp);
      }
    } catch (error) {
      alert("Error");
      return;
    }
  };

  const postReactionHandler = async (id, likes_count) => {
    try {
      let likes = [];
      if (likes_count.includes(localStorage.getItem("email"))) {
        likes = likes_count.filter(
          (itr) => itr != localStorage.getItem("email"),
        );
      } else {
        likes = [...likes_count, localStorage.getItem("email")];
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-likes`,
        {
          method: "PUT",
          body: JSON.stringify({ id, likes }),
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        },
      );

      if (!response) return;

      const data = await response.json();

      if (data.success) {
        let index = postData.findIndex((itr) => itr._id == id);
        let arr = postData.filter((itr) => itr._id == id);
        arr[0].likes_count = likes;
        let arr2 = postData.filter((itr) => itr._id != id);
        arr2.splice(index, 0, arr[0]);
        setPostData(arr2);
        return;
      }
      alert("Likes Not Updated");
      return;
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  const getPostsData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-posts-data`,
        {
          credentials: "include",
        },
      );
      if (!response) {
        alert("Error");
        return;
      }
      const data = await response.json();
      if (data.success) {
        setPostData(data.result.reverse());
        data.result.forEach((info) => {
          if (!idArray.includes(info._id)) idArray.push(info._id);
        });
        getUsersData();
        return;
      } else {
        alert("Posts Not Loaded");
        return;
      }
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <div className="z-0">
      <div className="flex flex-col gap-4 mb-10">
        <div>
          {postData.map((data, index) => (
            <div
              key={data._id}
              className="h-fit lg:w-[660px] w-fit bg-white rounded-lg text-black p-5 my-10 z-30"
            >
              {arr[index] && (
                <div>
                  <Link to={`/profile/${arr[index].email}`}>
                    <div className="w-fit p-2 pl-0 rounded-xl flex gap-x-2 hover:bg-gray-1x00">
                      <img
                        src={
                          arr[index].profile_picture
                            ? arr[index].profile_picture
                            : "../../assets/sample_profile.jpg"
                        }
                        alt=""
                        className="h-12 w-12 lg:h-16 lg:w-16 rounded-full"
                      />
                      <div>
                        <h1 className="font-bold text-md lg:text-lg">
                          {arr[index].full_name}
                        </h1>
                        <div className="flex justify-center items-center gap-x-2 text-gray-600 text-xs lg:text-sm font-semibold">
                          <p>@{arr[index].username}</p>
                          <div className="h-1 w-1 rounded-full text-sm lg:text-md bg-gray-600"></div>
                          <p>{moment(data.createdAt).fromNow()}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="hidden">
                    {(contentArray = data.content.split(" "))}
                  </div>
                  <div>
                    <div className="w-72 lg:w-full my-5 flex flex-wrap text-black gap-x-1">
                      {contentArray.map((info, index) => (
                        <div key={index}>
                          <h1
                            className="font-semibold text-sm lg:text-md"
                            style={
                              info.includes("#")
                                ? { color: "blue" }
                                : { color: "black" }
                            }
                          >
                            {info}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    {data.post_type != "text" && (
                      <img src={data.image_urls[0]} alt="" className="h-auto w-72 lg:w-auto"/>
                    )}
                  </div>
                  <div className="h-1 w-full bg-gray-300 rounded-full my-5"></div>
                  <div className="flex gap-x-4">
                    <div
                      onClick={() =>
                        postReactionHandler(data._id, data.likes_count)
                      }
                      className="flex gap-x-2"
                    >
                      {data.likes_count.includes(
                        localStorage.getItem("email"),
                      ) ? (
                        <Heart color="red" />
                      ) : (
                        <Heart color="gray" />
                      )}
                    </div>
                    <div
                      onClick={()=>commentSectionHandler(data._id)}
                      className="flex gap-x-2"
                    >
                      <MessageCircle color="gray" />
                    </div>
                    <div  onClick={()=>shareHandler(data._id)} className="flex gap-x-2">
                      <Share2 color="gray" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
