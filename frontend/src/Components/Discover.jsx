import React, { useEffect, useState } from "react";
import SignInPage from "./SignInPage";
import Sidebar from "./Sidebar";
import {
  Link,
  LocationEdit,
  MessageCircle,
  PlusIcon,
  SearchIcon,
  UserPlus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/Slice/userDataSlice.js";
import { useNavigate } from "react-router";
import { setAlertButton } from "../Redux/Slice/alertButtonSlice.js";
import Alert from "./Alert.jsx";
const Discover = () => {
  const [search, setSearch] = useState("");
  const [completeData, setCompleteData] = useState();
  const [connectionsData, setConnectionsData] = useState();
  const [profile, setProfile] = useState({});
  const dispatch = useDispatch();
  const [arr, setArr] = useState([]);
  const userData = useSelector((state) => state.userData.value);
  const [followingArray, setFollowingArray] = useState([]);
  const [connectingArray, setConnectingArray] = useState([]);
  const [changer, setChanger] = useState(false);
  const alertButton = useSelector((state) => state.alertButton.value);
  const navigate = useNavigate();
  const getDiscoverData = () => {
    if (userData != [] && userData.payload && userData.payload != []) {
      const arr2 = userData.payload.filter(
        (data) => data.username != localStorage.getItem("user"),
      );
      setArr(arr2);
      const profileArr = {
        ...userData.payload.find(
          (data) => data.username == localStorage.getItem("user"),
        ),
      };

      if (profileArr) {
        setProfile(profileArr);
        setFollowingArray(profileArr.following);
      }
      setConnectionsData(arr2);
      setCompleteData(arr2);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getDiscoverData();
  }, [followingArray, changer]);

  const updateFollowing = async (newFollowingArray) => {
    try {
      const info = {
        email: profile.email,
        following: newFollowingArray,
      };
      const response = await fetch(`/api/update-following`, {
        method: "PUT",
        body: JSON.stringify(info),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response) {
        alert("Error");
        return;
      }

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setChanger(true);
        return;
      } else {
        return;
      }
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  const updateFollower = async (email) => {
    try {
      const info = {
        email: email,
        followerEmail: profile.email,
      };
      const response = await fetch(`/api/update-follower`, {
        method: "PUT",
        body: JSON.stringify(info),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response) {
        alert("Error");
        return;
      }

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setChanger(true);
        return;
      } else {
        alert("Error");
        return;
      }
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  const followHandler = (email) => {
    let newFollowingArray = [];
    if (!followingArray.includes(email)) {
      newFollowingArray = [...followingArray, email];
    } else {
      newFollowingArray = followingArray.filter((itr) => itr != email);
    }

    setFollowingArray(newFollowingArray);
    setProfile({ ...profile, following: newFollowingArray });

    const updatedPayload = userData.payload.map((info) => {
      if (info.username == localStorage.getItem("user")) {
        return { ...info, following: newFollowingArray };
      } else {
        if (info.email == email) {
          if (!(info.followers || []).includes(profile.email))
            return { ...info, followers: [...info.followers, profile.email] };
          else {
            const newFollowersArr = (info.followers || []).filter(
              (data) => data != profile.email,
            );
            return { ...info, followers: newFollowersArr };
          }
        } else {
          return info;
        }
      }
    });

    dispatch(setUserData(updatedPayload));
    updateFollowing(newFollowingArray);
    updateFollower(email);
  };

  const connectHandler = async (email) => {
    try {
      const info = {
        senderEmail: profile.email,
        receiverEmail: email,
      };

      const response = await fetch(`/api/save-connect-request`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(info),
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
        // alert("Connection Request Sent.");
        setTimeout(() => {
          dispatch(setAlertButton(""));
        }, 5000);
        dispatch(setAlertButton("Connection Request Sent."));
        let updatedPayload = userData.payload.map((info) => {
          console.log(info);
          if (info.email == profile.email) {
            return { ...info, sentRequest: [...info.sentRequest, email] };
          }
          if (info.email == email) {
            return {
              ...info,
              receiveRequest: [...info.receiveRequest, profile.email],
            };
          }
          return info;
        });
        dispatch(setUserData(updatedPayload));
        setChanger(true);
        return;
      }
      alert("No Connection Request Sent");
      return;
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  const searchHandler = (e) => {
    const arr = completeData.filter(
      (data) =>
        data._id.toLowerCase().includes(search.toLowerCase()) ||
        data.full_name.toLowerCase().includes(search.toLowerCase()) ||
        `@${data.username.toLowerCase()}`.includes(search.toLowerCase()) ||
        data.bio.toLowerCase().includes(search.toLowerCase()) ||
        data.location.toLowerCase().includes(search.toLowerCase()),
    );
    setConnectionsData(arr);
  };

  return (
    <div>
      <div className="min-h-screen h-fit flex flex-col lg:ml-72 lg:py-10 lg:px-16 w-[1110px] bg-gray-200">
        <Sidebar />
        <div>
          {alertButton.payload != "" && alertButton.payload && (
            <div className="relative bottom-28 right-24 z-20">
              <Alert />
            </div>
          )}
          <div className={(alertButton.payload != "" && alertButton.payload)?"mt-16 lg:mt-0 p-2 lg:p-0 relative bottom-32":"mt-16 lg:mt-0 p-2 lg:p-0"}>
            <h1 className="text-black text-2xl lg:text-4xl font-bold z-0">
              Discover
            </h1>
            <p className="text-gray-600 font-semibold w-[300px] text-sm lg:text-md lg:mt-2">
              Connect with amazing people and grow your network
            </p>
          </div>
          <div className="h-14 lg:h-28 w-fit p-3 lg:p-5 flex justify-center items-center bg-white m-6 ml-3 lg:mt-10">
            <div className="h-7 w-7 lg:h-10 lg:w-10 border-2 border-r-0 border-gray-300 flex justify-center items-center rounded-lg rounded-r-none">
              <SearchIcon color="gray" />
            </div>
            <input
              type="text"
              name="discover-search"
              id="discover-search"
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value.trim() == "") {
                  setConnectionsData(connectionsCompleteData);
                }
                searchHandler();
              }}
              placeholder="Search people by name,username,bio,or location..."
              className="h-7 lg:h-10 w-72 lg:w-[800px] border-2 border-l-0 border-gray-300 rounded-lg rounded-l-none outline-none placeholder:font-light placeholder:text-gray-800"
            />
          </div>

          <div className="flex w-[300px] lg:w-auto m-5 lg:m-0 flex-wrap gap-2 mt-5">
            {connectionsData &&
              connectionsData.map((data) => (
                <div
                  className="w-72 h-80 lg:max-h-[500px] lg:w-80 border-2 border-gray-400 rounded-lg bg-white flex p-2 lg:p-4 justify-center items-center"
                  key={data._id}
                >
                  <div>
                    <div className="w-72 lg:w-96 flex flex-wrap ml-6 lg:ml-0 lg:mt-2 justify-center items-center gap-x-2 lg:gap-x-4">
                      <img
                        src={data.profile_picture}
                        alt=""
                        className="h-12 w-12 lg:h-16 lg:w-16 rounded-full"
                      />
                      <div>
                        <h1 className="font-bold text-sm lg:text-md">
                          {data.full_name}
                        </h1>
                        <p className="text-gray-600 text-sm lg:text-md">
                          @{data.username}
                        </p>
                      </div>
                    </div>
                    <div className="h-20 w-72 lg:w-96 ml-10 lg:ml-0 mt-4 mb-8 lg:mt-8 text-sm lg:text-md flex justify-center items-center text-gray-900">
                      <p className="w-64">{data.bio}</p>
                    </div>
                    <div className="w-72 lg:w-96 flex justify-center gap-4 ml-6 lg:ml-0 my-4">
                      <button className="border-2 border-gray-400 rounded-full flex text-xs gap-x-2 p-1 lg:p-2">
                        <LocationEdit />
                        <p>{data.location}</p>
                      </button>

                      <button className="border-2 border-gray-400 rounded-full text-xs p-1 lg:p-2">
                        <p>{data.followers.length} Followers</p>
                      </button>
                    </div>
                    <div className="w-72 lg:w-96 flex justify-center gap-2 ml-6 lg:ml-0 my-3">
                      <button
                        className="w-28 lg:w-36 text-sm lg:text-md flex justify-center items-center bg-black text-white rounded-lg gap-x-2 p-2"
                        onClick={() => followHandler(data.email)}
                      >
                        <UserPlus color="white" />
                        {followingArray.includes(data.email) ? (
                          <p>Following</p>
                        ) : (
                          <p>Follow</p>
                        )}
                      </button>

                      <button
                        className="w-28 lg:w-36 text-sm lg:text-md flex justify-center items-center bg-black text-white rounded-lg gap-x-2 p-2"
                        onClick={() => connectHandler(data.email)}
                      >
                        <div className="flex gap-x-2">
                          <Link color="white" />
                          {data.receiveRequest.includes(profile.email) ||
                          data.sentRequest.includes(profile.email) ? (
                            <p className="mt-1">Pending</p>
                          ) : data.connections.includes(profile.email) ? (
                            <p className="mt-1">Connected</p>
                          ) : (
                            <p className="mt-1">Connect</p>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
