import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidity, setEmailValidity] = useState("");
  const [passwordValidity, setPasswordValidity] = useState("");
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      setEmailValidity("No C/apital letter is allowed in email address");
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
      setPasswordValidity("Password must contain c/apital letter");
      return false;
    }

    if (lowerLetter == 0) {
      setPasswordValidity("Password must contain small letter");
      return false;
    }

    return true;
  };

  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      if (!checkValidation()) return;
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response) {
        alert("No Response");
        return;
      }

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user", data.payload.username);
        localStorage.setItem("name", data.payload.full_name);
        localStorage.setItem("email", data.payload.email);
        alert("Welcome back @" + data.payload.username);
        navigate("/");
        return;
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

  const googleAuthHandler = async (event) => {
    try {
      const googleToken = event.credential;
      const response = await fetch(`/api/auth/google`, {
        method: "POST",
        body: JSON.stringify({ googleToken }),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!response) {
        alert("Error....");
        return;
      }

      const data = await response.json();
      if (data.success) {
        document.cookie = `token=${data.token}`;
        localStorage.setItem("user", data.payload.username);
        localStorage.setItem("name", data.payload.full_name);
        localStorage.setItem("email", data.payload.email);
        alert("Welcome @" + data.payload.username);
        navigate("/");
        return;
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
      <div>
        <div className="h-fit w-72 lg:w-96 bg-white text-black rounded-t-xl flex justify-center py-7 lg:py-10">
          <div>
            <div className="text-center">
              <h1 className="font-bold text-md lg:text-lg">Login</h1>
              <p className="text-xs lg:text-sm text-gray-400">
                Welcome back! Please Login to continue.
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
                onSubmit={loginHandler}
              >
                <div className={emailValidity != "" &&  "ml-4 lg:ml-0"}>
                  <h1 htmlFor="email" className="font-semibold text-xs lg:text-sm mb-1">
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
                  <h1 htmlFor="email" className="font-semibold text-xs lg:text-sm mb-1">
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
                        className="w-76 outline-none placeholder:text-xs lg:text-sm"
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
                  <p className="text-red-500">{passwordValidity}</p>
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
            <p>Don't have an account?</p>
            <Link to="/signup">
              <p className="font-semibold">Sign up</p>
            </Link>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
