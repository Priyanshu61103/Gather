import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import Loader from "./Loader";

const OtpVerification = () => {
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;
  const dispatch = useDispatch();
  const accountCreationHandler = async () => {
    try {
      const email = userData.email;
      const password = userData.password;
      const data = {
        email,
        password,
        otp,
      };
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response) {
        return;
      }

      const info = await response.json();
      if (info.success) {
        document.cookie = `token=,${info.token}`;
        localStorage.setItem("user", info.payload.username);
        localStorage.setItem("name", info.payload.full_name);
        localStorage.setItem("email", info.payload.email);
        alert(
          "@" +
            info.payload.username +
            " you have successfully created your account. Please Login in to access Gather.",
        );
        navigate("/signin");
        return;
      }
      console.log(info.message);
      if (info.message == "Otp Didn't Match") alert(info.message);
      else alert("Internal Server Error");
    } catch (error) {
      console.log(error.message);
      alert("Internal Server Error");
    }
  };

  const otpChecker = (event) => {
    try {
      event.preventDefault();
      accountCreationHandler();
    } catch (error) {
      alert(error.message);
      return;
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-neutral-700">
      <div className="h-fit w-80 lg:w-96 bg-white text-black rounded-xl flex justify-center mr-10 lg:mr-0 py-10">
        <div>
          <div className="text-center">
            <h1 className="font-bold text-lg">Verification</h1>
            <p className="text-sm text-gray-400">
              Please give otp to verify your account
            </p>
          </div>
          <div>
            <form
              action=""
              className="flex flex-wrap gap-8 justify-center mt-8"
              onSubmit={otpChecker}
            >
              <div>
                <h1 htmlFor="email" className="font-semibold text-sm mb-1">
                  Otp
                </h1>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  renderSeparator={<span>-</span>}
                  inputStyle={{
                    border: "2px solid gray",
                    borderRadius: "10px",
                    height: "40px",
                    width: "40px",
                    color: "black",
                    outline: "0",
                  }}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <button className="w-72 lg:w-80 p-2 bg-black rounded-lg flex justify-center items-center font-semibold text-white">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
