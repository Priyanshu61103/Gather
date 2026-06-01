import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import moment from "moment";

const ConnectionsTab = () => {
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
        console.log(userData);
        const updatedData = userData.payload.filter(
          (data, index) =>
            data.email != localStorage.getItem("email") && index <= 2,
        );

        let arr = [];
        console.log(updatedData);
        if (updatedData && updatedData[0]) {
          arr = updatedData[0].connections.map((itr) => {
            return getData(itr);
          });
        }

        let arr2 = await Promise.all(arr);
        console.log(arr2);
        setConnectionArray(arr2);
      } else {
        navigate("/");
      }
    };

    fetchData();
  }, [userData]);

  return (
    <div>
      {connectionArray && (
        <div className="w-80 h-fit bg-white rounded-lg p-5">
          <h1 className="font-bold text-black">Connections</h1>
          {connectionArray.map((data) => (
            <Link to={`/profile/${data[0].email}`}>
              <div
                className="flex justify-between my-4 hover:bg-neutral-200 rounded-full"
                key={data[0]._id}
              >
                <div className="flex gap-x-2 ">
                  <div>
                    {data && data[0].profile_picture && (
                      <img
                        src={data[0].profile_picture}
                        alt=""
                        className="h-12 w-12 rounded-full"
                      />
                    )}
                  </div>
                  <div>
                    {data && data[0].profile_picture && (
                      <h1 className="font-bold text-sm text-black">
                        {data[0].full_name}
                      </h1>
                    )}
                    <p className="w-48 text-xs text-gray-600 truncate">
                      {data[0].bio}
                    </p>
                  </div>
                </div>
                <div></div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectionsTab;
