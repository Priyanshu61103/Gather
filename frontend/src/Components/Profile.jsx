import React, { useEffect, useState } from "react";
import SignInPage from "./SignInPage";
import Sidebar from "./Sidebar";
import { useParams } from "react-router";
import moment from "moment";
import { Calendar, Edit, LocationEdit, LogOut } from "lucide-react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import EditProfile from "./EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { setEditButton } from "../Redux/Slice/editSlice";
import Loader from "./Loader";
import Alert from "./Alert";
import { setAlertButton } from "../Redux/Slice/alertButtonSlice";
import LogOutPage from "./LogOutPage";
import { setProfileData } from "../Redux/Slice/profileDataSlice";
const Profile = () => {
  const { email } = useParams();
  const [profile, setProfile] = useState();
  const [selectedDiv, setSelectedDiv] = useState("Posts");
  let postArray = [];
  const [postsData, setPostsData] = useState();
  const alertButton = useSelector((state) => state.alertButton.value);
  const profileData = useSelector((state) => state.profileData.value);
  const editButton = useSelector((state) => state.editButton.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [alertBtn, setAlertBtn] = useState(false);
  let contentArray = [];

  const getPostsData = async () => {
    try {
      const response = await fetch(`/api/get-posts-data`, {
        credentials: "include",
      });
      if (!response) {
        alert("Error");
        return;
      }
      const data = await response.json();
      if (data.success) {
        const arr = data.result;
        const userPostData = arr.filter((info) => postArray.includes(info._id));
        userPostData.reverse();
        setPostsData(userPostData);
        return;
      } else {
        return;
      }
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  const getProfileData = async () => {
    try {
      const response = await fetch(`/api/profile`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response) {
        alert("Error");
        return;
      }
      const data = await response.json();
      if (data.success) {
        if (
          alertButton.payload != "Profile Updated" &&
          alertButton.payload != "Profile Not Updated"
        ) {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          setLoading(true);
        }
        dispatch(setProfileData(data.result));
        setProfile(data.result);
        postArray = data.result[0].posts;
        getPostsData();
        return;
      } else {
        if (
          alertButton.payload != "Profile Updated" &&
          alertButton.payload != "Profile Not Updated"
        ) {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          setLoading(true);
        }
        // return;
      }
    } catch (error) {
      if (
        alertButton.payload != "Profile Updated" &&
        alertButton.payload != "Profile Not Updated"
      ) {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        setLoading(true);
      }
      console.log(error.message);
      return;
    }
  };

  useEffect(() => {
    getProfileData();
    if (
      alertButton.payload == "Profile Updated" ||
      alertButton.payload == "Profile Not Updated"
    ) {
      setTimeout(() => {
        setAlertBtn(false);
        dispatch(setAlertButton(""));
      }, 5000);
      setAlertBtn(true);
    }
  }, [
    alertButton.payload == "Profile Updated",
    alertButton.payload == "Profile Not Updated",
    email,
  ]);

  return (
    <div>
      {!loading && (
        <div>
          <div className=" bg-gray-200">
            <div>
              {alertBtn && (
                <div className="relative right-8 z-20">
                  <Alert />
                </div>
              )}
            </div>
            <div
              className={
                alertBtn.payload != "" &&
                alertBtn.payload &&
                "relative bottom-24"
              }
            >
              <div className="h-fit flex flex-col lg:ml-72 lg:py-10 lg:px-16 w-[300px] lg:w-[1200px] z-0">
                <div
                  className={
                    !editButton ? "opacity-100 z-20" : "opacity-50 z-20"
                  }
                >
                  <Sidebar />
                </div>
                <div
                  className={
                    !editButton
                      ? "h-fit w-[800px] mt-16 lg:mt-0 lg:w-[900px] p-2 pr-0 lg:p-0 bg-white rounded-2xl opacity-100"
                      : "h-fit w-[800px] mt-16 lg:mt-0 lg:w-[900px]  p-2 pr-0 lg:p-0 bg-white rounded-2xl opacity-50"
                  }
                >
                  {profile && (
                    <div>
                      <div
                        className="h-[200px] w-[350px] lg:h-[300px] lg:w-[900px] rounded-2xl rounded-b-none"
                        style={
                          profile[0].cover_photo != undefined
                            ? {
                                backgroundImage: `url(${profile[0].cover_photo})`,
                                backgroundSize: "cover",
                              }
                            : {
                                backgroundImage: `url(https://ik.imagekit.io/priyanshu61103/sample_cover.jpg)`,
                                backgroundSize: "cover",
                              }
                        }
                      ></div>
                      <div className="flex lg:gap-16 z-0">
                        {profile[0].profile_picture ? (
                          <div className="h-20 w-20 lg:h-36 lg:w-36 relative bottom-12 lg:bottom-16 lg:left-8 rounded-full bg-white flex justify-center items-center border-2 border-gray-200">
                            <img
                              src={profile[0].profile_picture}
                              alt=""
                              className="h-16 w-16 lg:h-32 lg:w-32 rounded-full"
                            />
                          </div>
                        ) : (
                          <div className="h-28 w-28 lg:h-36 lg:w-36 relative bottom-16 left-8 rounded-full bg-white flex justify-center items-center border-2 border-gray-200">
                            <img
                              src="https://ik.imagekit.io/priyanshu61103/profile-logo.png"
                              alt=""
                              className="h-24 w-24 lg:h-32 lg:w-32 rounded-full"
                            />
                          </div>
                        )}
                        <div>
                          <div className="flex w-[200px] lg:w-auto flex-wrap justify-between p-2">
                            <div>
                              <h1 className="font-bold text-2xl lg:text-4xl lg:mt-5">
                                {profile[0].full_name}
                              </h1>
                              <p className="text-gray-600 text-sm lg:text-md font-semibold lg:my-2">
                                @{profile[0].username}
                              </p>
                            </div>
                            {email === localStorage.getItem("email") && (
                              <div className="flex gap-x-2 lg:gap-x-4 my-4 lg:my-0">
                                <LogOutPage />
                                <button
                                  onClick={() => dispatch(setEditButton())}
                                  className="h-fit w-fit border-2 border-gray-400 p-1 lg:p-2 rounded-lg flex gap-x-2"
                                >
                                  <Edit />
                                  <p className="font-semibold text-black text-sm lg:text-lg">
                                    Edit
                                  </p>
                                </button>
                              </div>
                            )}
                          </div>
                          <p className="w-[250px] lg:w-[500px] text-sm lg:text-lg text-gray-600 font-semibold mb-2">
                            {profile[0].bio}
                          </p>
                          <div className="flex w-[200px] lg:w-auto flex-wrap gap-x-2 lg:gap-x-4 text-gray-800">
                            <div className="flex gap-x-2 text-sm lg:text-md p-2">
                              <LocationEdit
                                size={15}
                                className="block lg:hidden"
                              />
                              <LocationEdit className="hidden lg:block" />
                              <p>{profile[0].location}</p>
                            </div>

                            <div className="flex gap-x-2 text-sm lg:text-md p-2">
                              <Calendar size={15} className="block lg:hidden" />
                              <Calendar className="hidden lg:block" />
                              <p>
                                Joined {moment(profile[0].createdAt).fromNow()}
                              </p>
                            </div>
                          </div>
                          <div className="h-1 w-[300px] lg:w-[650px] bg-gray-400 lg:my-7"></div>
                          <div className="mb-5 flex items-center gap-x-4 lg:gap-x-8">
                            <div className="flex gap-x-2 items-end">
                              <h1 className="text-xl lg:text-4xl font-bold">
                                {profile[0].posts.length}
                              </h1>
                              <p className="text-gray-600 text-xs lg:text-md">
                                Posts
                              </p>
                            </div>

                            <div className="flex gap-x-2 items-end">
                              <h1 className="text-xl lg:text-4xl font-bold">
                                {profile[0].followers.length}
                              </h1>
                              <p className="text-gray-600 text-xs lg:text-md">
                                Followers
                              </p>
                            </div>

                            <div className="flex gap-x-2 items-end">
                              <h1 className="text-xl lg:text-4xl font-bold">
                                {profile[0].following.length}
                              </h1>
                              <p className="text-gray-600 text-xs lg:text-md">
                                Following
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex ml-20 lg:ml-0 lg:justify-center">
                    <div
                      className={
                        !editButton
                          ? "h-fit w-fit flex bg-white p-1 mt-2 lg:mt-10 gap-x-1 rounded-xl"
                          : "h-fit w-fit flex bg-white relative bottom-[400px] p-1 mt-2 lg:mt-10 gap-x-1 rounded-xl opacity-50"
                      }
                    >
                      {["Posts", "Media", "Likes"].map((data, index) => (
                        <div key={index}>
                          <button
                            onClick={() => setSelectedDiv(data)}
                            className={
                              selectedDiv == data
                                ? "h-fit w-16 p-1 lg:w-32 lg:p-2 bg-black text-white rounded-xl"
                                : "h-fit w-16 p-1 lg:w-32 lg:p-2 bg-white text-black rounded-xl"
                            }
                          >
                            {data}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedDiv == "Posts" && (
                  <div
                    className={
                      !editButton
                        ? "flex flex-wrap ml-16 lg:ml-0 justify-center gap-5 lg:gap-10 mt-5 lg:mt-10 z-10"
                        : "flex flex-wrap ml-16 lg:ml-0 mt-10 justify-center gap-5 lg:gap-10 opacity-50 z-10"
                    }
                  >
                    {postsData ? (
                      postsData.map((data) => (
                        <div
                          key={data._id}
                          className="h-fit lg:w-[740px] w-fit bg-white rounded-lg text-black p-5 z-30"
                        >
                          <div className="flex gap-x-2">
                            <img
                              src={
                                profile[0].profile_picture
                                  ? profile[0].profile_picture
                                  : "../../assets/sample_profile.jpg"
                              }
                              alt=""
                              className="h-12 w-12 lg:h-16 lg:w-16 rounded-full"
                            />
                            <div>
                              <h1 className="font-bold text-md lg:text-lg">
                                {profile[0].full_name}
                              </h1>
                              <div className="flex justify-center items-center gap-x-2 text-gray-600 text-xs lg:text-sm font-semibold">
                                <p>@{profile[0].username}</p>
                                <div className="h-1 w-1 rounded-full text-sm lg:text-md bg-gray-600"></div>
                                <p>{moment(data.createdAt).fromNow()}</p>
                              </div>
                            </div>
                          </div>
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
                              <img
                                src={data.image_urls[0]}
                                alt=""
                                className="h-auto w-72 lg:w-auto"
                              />
                            )}
                          </div>
                          <div className="h-1 w-full bg-gray-300 rounded-full my-5"></div>
                          <div className="flex gap-x-4">
                            <div className="flex gap-x-2">
                              <Heart color="gray" />
                              <p className="text-gray-600">
                                {data.likes_count.length}
                              </p>
                            </div>
                            <div className="flex gap-x-2">
                              <MessageCircle color="gray" />
                              <p className="text-gray-600">12</p>
                            </div>
                            <div className="flex gap-x-2">
                              <Share2 color="gray" />
                              <p className="text-gray-600">7</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h1 className="mr-48 text-black font-semibold">
                        No Posts Yet
                      </h1>
                    )}
                  </div>
                )}

                {selectedDiv == "Media" && (
                  <div
                    className={
                      !editButton
                        ? "flex flex-wrap mt-5 lg:mt-10 ml-12 lg:ml-0 z-0"
                        : "flex flex-wrap mt-5 lg:mt-10 ml-12 lg:ml-0 opacity-50 z-0"
                    }
                  >
                    {postsData ? (
                      postsData.map((data) => (
                        <div key={data._id}>
                          {data.image_urls[0] != "undefined" && (
                            <div
                              className="group h-[200px] w-[300px] opacity-100 flex flex-col-reverse hover:bg-black/20 hover:bg-blend-overlay items-end hover:opacity-70 transition-opacity"
                              style={{
                                backgroundImage: `url(${data.image_urls[0]})`,
                                backgroundSize: "cover",
                              }}
                            >
                              <h1 className="text-white hidden p-1 bg-black/40 group-hover:inline-block">
                                Posted {moment(data.createdAt).fromNow()}
                              </h1>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <h1 className="mx-96 text-black font-semibold">
                        No Media Used Yet
                      </h1>
                    )}
                  </div>
                )}

                {selectedDiv == "Likes" && (
                  <div
                    className={
                      !editButton
                        ? "min-h-[600px] flex flex-wrap justify-center ml-2 lg:ml-0 gap-10 mt-10 z-0"
                        : "min-h-[600px] flex flex-wrap  mt-10 justify-center gap-10 ml-2 lg:ml-0 opacity-50 z-0"
                    }
                  >
                    {postsData ? (
                      postsData.map((data) => (
                        <div key={data._id}>
                          <div></div>
                        </div>
                      ))
                    ) : (
                      <h1 className="mr-44 text-black font-semibold">
                        No Likes Yet
                      </h1>
                    )}
                  </div>
                )}
              </div>

              {editButton && (
                <div className="fixed top-5 left-[500px] z-40">
                  <EditProfile data={profile[0]} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Profile;
