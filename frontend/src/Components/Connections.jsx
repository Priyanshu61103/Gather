import React, { useEffect, useState } from "react";
import SignInPage from "./SignInPage";
import Sidebar from "./Sidebar";
import {
  Check,
  User2,
  UserCheck,
  UserCheck2,
  UserCog,
  UserCog2,
  UserCogIcon,
  UserIcon,
  UserPlus,
  UserRoundPen,
  Users,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/Slice/userDataSlice.js";
const Connections = () => {
  const userData = useSelector((state) => state.userData.value);
  const [followersArray, setFollowersArray] = useState([]);
  const [followingArray, setFollowingArray] = useState([]);
  const [pendingConnectionsArray, setPendingConnectionsArray] = useState([]);
  const [connectionsArray, setConnectionsArray] = useState([]);
  const [changer, setChanger] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arr = [
    followersArray,
    followingArray,
    pendingConnectionsArray,
    connectionsArray,
  ];

  const getData = async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/profile`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ email }),
          headers: {
            "content-type": "application/json",
          },
        },
      );

      if (!response) return;

      const data = await response.json();
      if (data.success) {
        return data.result;
      }
      alert("Error");
      return null;
    } catch (error) {
      alert(error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userData != [] && userData.payload && userData.payload != []) {
        const info = userData.payload.filter(
          (data) => data.email == localStorage.getItem("email"),
        );
        const followersArr = (info[0].followers || []).map((itr) => {
          return getData(itr);
        });
        const arr = await Promise.all(followersArr);
        setFollowersArray(arr);
        const followingArr = (info[0].following || []).map((itr) => {
          return getData(itr);
        });
        const arr2 = await Promise.all(followingArr);
        setFollowingArray(arr2);

        const pendingArr = (info[0].receiveRequest || []).map((itr) => {
          return getData(itr);
        });

        const arr3 = await Promise.all(pendingArr);
        console.log(arr3);
        setPendingConnectionsArray(arr3);

        const connectionsArr = info[0].connections.map((itr) => {
          return getData(itr);
        });

        const arr4 = await Promise.all(connectionsArr);
        setConnectionsArray(arr4);
      } else {
        navigate("/");
      }
    };

    fetchData();
  }, [changer]);

  const acceptedRequestHandler = async (email) => {
    try {
      const connectInfo = {
        sender: email,
        receiver: localStorage.getItem("email"),
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/accept-request`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(connectInfo),
          headers: {
            "content-type": "application/json",
          },
        },
      );

      if (!response) return;

      const data = await response.json();
      if (data.success) {
        alert("Yayy ! You both are Connected Now");
        let updatedPayload = userData.payload.filter(
          (itr) =>
            itr.email != email && itr.email != localStorage.getItem("email"),
        );
        let arr = {
          ...userData.payload.find(
            (itr) => itr.email == localStorage.getItem("email"),
          ),
        };
        let arr2 = { ...userData.payload.find((itr) => itr.email == email) };
        let arr3 = arr.receiveRequest.filter((it) => it != email);
        arr.receiveRequest = arr3;
        arr.connections = [...arr.connections, email];
        let arr4 = arr2.sentRequest.filter(
          (it) => it != localStorage.getItem("email"),
        );
        arr2.sentRequest = arr4;
        arr2.connections = [...arr2.connections, localStorage.getItem("email")];
        updatedPayload = [...updatedPayload, arr, arr2];
        console.log(updatedPayload);
        dispatch(setUserData(updatedPayload));
        setChanger(true);
        return;
      }
      alert("Connection Not Created");
      return;
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  const rejectedRequestHandler = async (email) => {
    try {
      const connectInfo = {
        sender: email,
        receiver: localStorage.getItem("email"),
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/reject-request`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(connectInfo),
          headers: {
            "content-type": "application/json",
          },
        },
      );

      if (!response) return;

      const data = await response.json();
      if (data.success) {
        alert("Connection Declined Successfully");
        let updatedPayload = userData.payload.filter(
          (itr) =>
            itr.email != email && itr.email != localStorage.getItem("email"),
        );
        let arr = {
          ...userData.payload.find(
            (itr) => itr.email == localStorage.getItem("email"),
          ),
        };
        let arr2 = { ...userData.payload.find((itr) => itr.email == email) };
        let arr3 = arr.receiveRequest.filter((it) => it != email);
        arr.receiveRequest = arr3;
        let arr4 = arr2.sentRequest.filter(
          (it) => it != localStorage.getItem("email"),
        );
        arr2.sentRequest = arr4;
        updatedPayload = [...updatedPayload, arr, arr2];
        console.log(updatedPayload);
        dispatch(setUserData(updatedPayload));
        setChanger(true);
        return;
      }
      alert("Connection Not Declined.");
      return;
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  const [selectedOption, setSelectedOption] = useState(0);
  return (
    <div>
      <div className="min-h-screen h-fit flex flex-col lg:ml-72 lg:py-10 lg:px-16 w-full bg-gray-200">
        <Sidebar />
        <div className="mt-16 lg:mt-0 p-2 pr-0 lg:p-0">
          <h1 className="text-black text-2xl lg:text-4xl font-bold">
            Connections
          </h1>
          <p className="text-gray-600 font-semibold w-[300px] text-sm lg:text-md lg:mt-2">
            Manage your network and discover connections
          </p>
          <div className="flex flex-wrap gap-x-1 lg:gap-x-8 my-10">
            {arr.map((data, index) => (
              <div
                className="h-8 w-18 lg:h-20 lg:w-40 flex justify-center items-center bg-white"
                key={index}
              >
                <div className="text-sm lg:text-md p-2 lg:p-0">
                  <h1 className="font-bold text-center">{data.length}</h1>
                  {index == 0 && <p>Followers</p>}
                  {index == 1 && <p>Following</p>}
                  {index == 2 && <p>Pending</p>}
                  {index == 3 && <p>Connections</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit w-60 lg:w-[580px] p-2 flex gap-4 flex-wrap lg:justify-around bg-white">
            <div
              onClick={() => setSelectedOption(0)}
              className="flex gap-x-2 lg:gap-x-4"
            >
              <Users size={15} className="block lg:hidden" />
              <Users size={25} className="lg:block hidden" />
              <p
                className={
                  selectedOption == 0
                    ? "text-sm lg:text-lg font-bold"
                    : "text-sm lg:text-lg"
                }
              >
                Followers
              </p>
            </div>

            <div
              onClick={() => setSelectedOption(1)}
              className="flex gap-x-2 lg:gap-x-4"
            >
              <UserCheck size={15} className="block lg:hidden" />
              <UserCheck size={25} className="lg:block hidden" />
              <p
                className={
                  selectedOption == 1
                    ? "text-sm lg:text-lg font-bold"
                    : "text-sm lg:text-lg"
                }
              >
                Following
              </p>
            </div>

            <div
              onClick={() => setSelectedOption(2)}
              className="flex gap-x-2 lg:gap-x-4"
            >
              <UserRoundPen size={15} className="block lg:hidden" />
              <UserRoundPen size={25} className="lg:block hidden" />
              <p
                className={
                  selectedOption == 2
                    ? "text-sm lg:text-lg font-bold"
                    : "text-sm lg:text-lg"
                }
              >
                Pending
              </p>
            </div>

            <div
              onClick={() => setSelectedOption(3)}
              className="flex gap-x-2 lg:gap-x-4"
            >
              <UserPlus size={15} className="block lg:hidden"/>
              <UserPlus size={25} className="lg:block hidden"/>
              <p
                className={
                  selectedOption == 3
                    ? "text-sm lg:text-lg font-bold"
                    : "text-sm lg:text-lg"
                }
              >
                Connections
              </p>
            </div>
          </div>

          <div className="h-fit w-[300px] lg:w-[1200px] flex flex-wrap gap-5 mt-10">
            {arr[selectedOption].map((data) => (
              <div className="h-fit w-fit bg-white p-1 lg:p-5" key={data[0]._id}>
                <div className="flex gap-x-2">
                  <div>
                    {data[0].profile_picture && (
                      <img
                        src={data[0].profile_picture}
                        alt=""
                        className="h-12 w-12 lg:h-20 lg:w-20 rounded-full"
                      />
                    )}
                  </div>
                  <div>
                    <div className="flex">
                      <div>
                        <h1 className="font-bold text-sm lg:text-md">{data[0].full_name}</h1>
                        <p className="text-gray-600 font-semibold text-xs lg:text-md">
                          @{data[0].username}
                        </p>
                        <p className="w-56 lg:w-72 text-gray-600 font-semibold truncate text-xs lg:text-md">
                          {data[0].bio}
                        </p>
                        <div>
                          <div>
                            <Link to={`/profile/${data[0].email}`}>
                              <button className="h-10 w-52 lg:h-15 lg:w-72 lg:p-2 flex justify-center items-center text-white bg-black mt-5 rounded-lg">
                                View Profile
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      {selectedOption == 2 && (
                        <div className="flex flex-col gap-4 mx-4">
                          <div
                            onClick={() =>
                              acceptedRequestHandler(data[0].email)
                            }
                            className="border-2 border-green-400 hover:bg-green-200 rounded-full h-12 w-12 flex justify-center items-center"
                          >
                            <Check color="green" />
                          </div>
                          <div
                            onClick={() =>
                              rejectedRequestHandler(data[0].email)
                            }
                            className="border-2 border-red-400 hover:bg-red-200 rounded-full h-12 w-12 flex justify-center items-center"
                          >
                            <X color="red" />
                          </div>
                        </div>
                      )}
                    </div>
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

export default Connections;
