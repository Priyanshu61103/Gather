import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Loader from "./Loader.jsx";
import { useDispatch } from "react-redux";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidity, setEmailValidity] = useState("");
  const [passwordValidity, setPasswordValidity] = useState("");
  const [visibility, setVisibility] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkValidation = () => {
    if (email.length == 0) {
      setEmailValidity("Please Give Email Address");
      return false;
    }

    if (!email.includes("@")) {
      setEmailValidity("@ is missing in email address.");
      return false;
    }

    if (email.includes("#") || email.includes("/")) {
      setEmailValidity("No Special Character other than @ is allowed");
      return false;
    }

    if (email.includes(" ")) {
      setEmailValidity("No Spaces are allowed in email address");
      return false;
    }

    if (
      !email.includes(".com") &&
      !email.includes(".in") &&
      !email.includes(".org")
    ) {
      setEmailValidity("Domain Extension is missing in Email Address");
      return false;
    }

    if (email != email.toLowerCase()) {
      setEmailValidity("No Capital letter is allowed in email address");
      return false;
    }

    if (password.length == 0) {
      setPasswordValidity("Please Create a Password");
      return false;
    }
    if (password.length <= 8) {
      setPasswordValidity("Password should contain atleast 8 characters");
      return false;
    }

    let upperLetter = 0,
      lowerLetter = 0,
      number = 0,
      specialCharacter = 0;
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "A" && password[i] <= "Z") upperLetter++;
      else if (password[i] >= "a" && password[i] <= "z") lowerLetter++;
      else if (password[i] >= "0" && password[i] <= "9") number++;
      else specialCharacter++;
    }

    if (specialCharacter == 0) {
      setPasswordValidity("Password must contain Special Characters");
      return false;
    }
    if ((upperLetter == 0 && lowerLetter == 0) || number == 0) {
      setPasswordValidity("Password should be Alphanumeric.");
      return false;
    }

    if (upperLetter == 0) {
      setPasswordValidity("Password must contain capital letter");
      return false;
    }
    if (lowerLetter == 0) {
      setPasswordValidity("Password must contain small letter");
      return false;
    }

    return true;
  };
  const signUpHandler = async (event) => {
    try {
      event.preventDefault();
      if (!checkValidation()) return;

      const userData = { email: email, password: password };
      console.log(userData);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/otp-creation`,
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        },
      );
      if (!response) {
        return;
      }
      const data = await response.json();
      if (!data.success) {
        alert("ERROR");
        return;
      }
      alert("Otp Sent to Given Email Address");
      navigate("/otp-verification-page", { state: userData });
      return;
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  const googleAuthHandler = async (event) => {
    try {
      const googleToken = event.credential;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/google`,
        {
          method: "POST",
          body: JSON.stringify({ googleToken }),
          headers: {
            "content-type": "application/json",
          },
        },
      );

      if (!response) {
        alert("Error....");
        return;
      }

      const data = await response.json();
      if (data.success) {
        document.cookie = `token=${data.token} Secure; SameSite=None`;
        localStorage.setItem("user", data.payload.username);
        localStorage.setItem("name", data.payload.full_name);
        localStorage.setItem("email", data.payload.email);
        alert(
          "@" +
            data.payload.username +
            " you have successfully created your account. Please Login in to access Gather.",
        );
        navigate("/signin");
      } else {
        alert("Error");
        console.log(data.message);
        return;
      }
    } catch (error) {
      console.log(error.message);
      alert("Error Catched");
      return;
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="h-screen w-screen flex justify-center items-center bg-neutral-500">
        <div>
          <div className="h-fit w-72 lg:w-96 bg-white text-black rounded-t-xl flex justify-center mr-10 lg:mr-0 py-7 lg:py-10">
            <div>
              <div className="text-center">
                <h1 className="font-bold text-md lg:text-lg">
                  Create your account
                </h1>
                <p className="text-xs lg:text-sm text-gray-400">
                  Welcome! Please Fill the details to get started.
                </p>
              </div>
              <div>
                <div className="h-20 w-full flex justify-center items-center">
                  <GoogleLogin
                    width="250"
                    onSuccess={googleAuthHandler}
                    onError={() => console.log("Google Error")}
                  />
                </div>

                <div className="flex gap-x-4 justify-center items-center">
                  <div className="h-0.5 w-28 lg:w-36 bg-gray-100"></div>
                  <p className="tet-sm text-gray-500">or</p>
                  <div className="h-0.5 w-28 lg:w-36 bg-gray-100"></div>
                </div>
                <form
                  action=""
                  className="flex flex-wrap gap-8 justify-center mt-8"
                  onSubmit={signUpHandler}
                >
                  <div className={emailValidity != "" &&  "ml-4 lg:ml-0"}>
                    <h1
                      htmlFor="email"
                      className="font-semibold text-xs lg:text-sm mb-1"
                    >
                      Email address
                    </h1>
                    <input
                      type="text"
                      placeholder="Enter your email address"
                      className="lg:w-80 w-64 border-2 p-2 rounded-lg placeholder:text-xs lg:text-sm outline-none border-gray-200"
                      onChange={(event) => {
                        setEmailValidity("");
                        setEmail(event.target.value);
                      }}
                      style={
                        emailValidity == ""
                          ? { border: "2px solid gray" }
                          : { border: "2px solid red" }
                      }
                    />
                    <p className="ml-4 lg:ml-0 text-red-500">{emailValidity}</p>
                  </div>

                  <div className={passwordValidity != "" &&  "ml-4 lg:ml-0"}>
                    <h1
                      htmlFor="email"
                      className="font-semibold text-xs lg:text-sm mb-1"
                    >
                      Password
                    </h1>
                    <div
                      className="flex lg:w-80 w-64 border-2 p-2 rounded-lg border-gray-200 justify-between items-center"
                      style={
                        passwordValidity == ""
                          ? { border: "2px solid gray" }
                          : { border: "2px solid red" }
                      }
                    >
                      {!visibility ? (
                        <input
                          type="password"
                          placeholder="Enter your password"
                          className="outline-none placeholder:text-xs lg:text-sm"
                          onChange={(event) => {
                            setPasswordValidity("");
                            setPassword(event.target.value);
                          }}
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder="Create a password"
                          className="w-76 outline-none placeholder:text-sm"
                          onChange={(event) => {
                            setPasswordValidity("");
                            setPassword(event.target.value);
                          }}
                        />
                      )}
                      <img
                        src="https://ik.imagekit.io/priyanshu61103/password-eye-icon.png"
                        alt=""
                        className="h-6 w-7"
                        onClick={() => setVisibility(!visibility)}
                      />
                    </div>
                    <p className="ml-4 lg:ml-0 text-red-500">{passwordValidity}</p>
                  </div>

                  <button className="lg:w-80 w-64 p-2 bg-black rounded-lg flex justify-center text-sm lg:text-md items-center font-semibold text-white">
                    Continue
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="h-fit w-72 lg:w-96 bg-gray-100 text-black rounded-b-xl flex text-sm">
            <div className="h-12 w-full flex justify-center items-center gap-x-1 text-sm lg:text-md">
              <p>Already have an account?</p>
              <Link to="/">
                <p className="font-semibold">Login</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUpPage;
