import React, { useEffect, useState } from "react";
import SignInPage from "./SignInPage";
import Sidebar from "./Sidebar";
import { Eye, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
const Messages = () => {
  const userData = useSelector((state) => state.userData.value);
  const [connectionArray, setConnectionArray] = useState([]);
  const navigate = useNavigate();
  const getData = async (email) => {
    try {
      const response = await fetch(`/api/profile`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email }),
        headers: {
          "content-type": "application/json",
        },
      });

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
        const updatedData = userData.payload.filter(
          (data) => data.email == localStorage.getItem("email"),
        );

        let arr = updatedData[0].connections.map((itr) => {
          return getData(itr);
        });

        let arr2 = await Promise.all(arr);
        setConnectionArray(arr2);
      } else {
        navigate("/");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="min-h-screen h-auto flex flex-col lg:ml-72 lg:py-10 lg:px-16 w-auto bg-gray-200">
        <Sidebar />
        <div className="mt-16 lg:mt-0 p-4 pl-2 lg:p-0">
          <h1 className="text-black text-2xl lg:text-4xl font-bold">
            Messages
          </h1>
          <p className="text-gray-600 font-semibold text-sm lg:text-md mt-0 lg:mt-2">
            Talk to your friends and family
          </p>
          <div className="flex flex-col gap-4 mt-8">
            {connectionArray &&
              connectionArray.map((data) => (
                <div
                  className="h-fit w-fit bg-white p-2 lg:p-5"
                  key={data[0]._id}
                >
                  {console.log(data)}
                  <div className="flex gap-x-2">
                    <div>
                      <img
                        src={data[0].profile_picture}
                        alt=""
                        className="h-12 w-12 lg:h-20 lg:w-20 rounded-full"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold">{data[0].full_name}</h1>
                      <p className="text-gray-600 text-sm lg:text-md font-semibold">
                        @{data[0].username}
                      </p>
                      <p className="text-gray-600 font-semibold text-sm lg:text-md lg:w-[500px] w-[200px]">
                        {data[0].bio}
                      </p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Link to={`/messages/${data[0].email}`}>
                        <button className="lg:h-12 lg:w-12 h-8 w-8 flex justify-center items-center bg-gray-200">
                          <MessageSquare />
                        </button>
                      </Link>
                      <Link to={`/profile/${data[0].email}`}>
                        <button className="lg:h-12 lg:w-12 h-8 w-8 flex justify-center items-center bg-gray-200">
                          <Eye />
                        </button>
                      </Link>
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

export default Messages;
