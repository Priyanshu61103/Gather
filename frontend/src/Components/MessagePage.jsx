import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import SignInPage from "./SignInPage";
import Sidebar from "./Sidebar";
import { Check, CheckCheck, Image, Send } from "lucide-react";
import { useSelector } from "react-redux";
import moment from "moment";

const MessagePage = () => {
  const { email } = useParams();
  const [senderData, setSenderData] = useState();
  const [messageData, setMessageData] = useState();
  const [receivedMessageData, setReceivedMessageData] = useState();
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const [changer, setChanger] = useState(false);
  const userData = useSelector((state) => state.userData.value);
  const bottomElementRef = useRef(null);

  const fetchData = async () => {
    try {
      const info = {
        email_1: localStorage.getItem("email"),
        email_2: email,
      };

      const response = await fetch(
        `/api/get-messages`,
        {
          method: "POST",
          body: JSON.stringify(info),
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        },
      );

      if (!response) return;

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setMessageData(data.result2);
        return;
      }
      alert("Messages Not Loaded");
      return;
    } catch (error) {
      alert(error.message);
      return;
    }
  };
  useEffect(() => {
    const arr = userData.payload.filter((data) => data.email === email);
    setSenderData(arr);
    fetchData();
  }, [changer]);

  useEffect(()=>{
     bottomElementRef.current?.scrollIntoView({behavior:"auto"}); 
  },[messageData])

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("from_user_email", localStorage.getItem("email"));
      formData.append("to_user_email", email);
      if (!image) {
        if (text == "") {
          alert("Give Data to Send");
          return;
        }
        formData.append("text", text);
        formData.append("media_type", "text");
        setText("");
      }
      if (image) {
        formData.append("message_image", image);
        formData.append("media_type", "image");
        setImage();
      }
      const response = await fetch(
        `/api/post-message`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );

      if (!response) return;
      const data = await response.json();
      if (data.success) {
        setChanger(true);
        return;
      }

      alert("Message Not Sent.");
      return;
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  return (
    <div>
      <div className="h-fit flex flex-col lg:ml-[250px] w-[375px] lg:w-[1275px] bg-gray-100">
        <Sidebar />
        <div className="h-fit w-full bg-gray-200 p-2 mr-20 lg:mr-0 mb-12 lg:mb-0 lg:mx-16 px-10 py-1 relative top-16 lg:top-0 border-b-2 border-gray-400">
          <div>
            {senderData &&
              senderData.map((data) => (
                <div key={data._id}>
                  <div className="w-fit h-fit flex gap-x-2 items-center">
                    <img
                      src={
                        data.profile_picture
                          ? data.profile_picture
                          : "../../assets/sample_profile.jpg"
                      }
                      alt=""
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <h1 className="font-semibold text-lg">
                        {data.full_name}
                      </h1>
                      <div className="flex justify-center items-center gap-x-2 text-gray-600 text-sm font-semibold">
                        <p>@{data.username}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="min-h-screen h-fit p-4 lg:p-16">
          <div>
            {messageData &&
              messageData.map((data) => (
                <div key={data._id} className="m-2 lg:m-5">
                  <div
                    className={
                      data.from_user_email == localStorage.getItem("email")
                        ? "flex flex-wrap justify-start"
                        : "flex flex-wrap justify-end"
                    }
                  >
                    {data.media_type == "text" ? (
                      <div
                        className={
                          data.from_user_email == localStorage.getItem("email")
                            ? "w-fit h-fit text-sm rounded-lg bg-green-100 p-2 lg:p-4"
                            : "w-fit h-fit text-sm rounded-lg bg-white p-2 lg:p-4"
                        }
                      >
                        <h1 className="w-52 lg:w-auto">{data.text}</h1>
                        <div className="flex gap-x-2 text-xs text-gray-600 justify-end mt-2">
                          {moment(data.createdAt).format("hh:mm A")}
                          {data.from_user_email ==
                            localStorage.getItem("email") &&
                            (data.seen ? (
                              <CheckCheck color="blue" size="16" />
                            ) : (
                              <CheckCheck color="gray" size="16" />
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <img
                          src={data.media_url}
                          alt=""
                          className="w-50 h-32 lg:h-60 lg:w-50 rounded-lg"
                        />
                        <p className="flex gap-x-2 text-xs text-gray-600 justify-end mt-2">
                          {moment(data.createdAt).format("hh:mm A")}
                          {data.from_user_email ==
                            localStorage.getItem("email") &&
                            (data.seen ? (
                              <CheckCheck color="blue" size="16" />
                            ) : (
                              <CheckCheck color="gray" size="16" />
                            ))}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className="fixed bottom-4 left-10 lg:bottom-2 lg:left-[550px] mt-12 lg:mt-0">
            <div className="h-16 w-[275px] lg:w-[700px] bg-white rounded-full border-2 p-2 lg:p-5 flex justify-between items-center">
              <input
                type="text"
                placeholder="Type a message..."
                onChange={(event) => setText(event.target.value)}
                value={text}
                className="w-full outline-none placeholder:font-light"
              />
              <div className="flex gap-x-4">
                <button>
                  <label htmlFor="post-image">
                    <Image />
                  </label>
                  <input
                    type="file"
                    onChange={(event) => setImage(event.target.files[0])}
                    id="post-image"
                    className="hidden"
                  />
                </button>
                <button
                  onClick={submitHandler}
                  className="h-12 w-12 flex justify-center items-center bg-black rounded-full"
                >
                  <Send color="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={bottomElementRef}></div>
    </div>
  );
};

export default MessagePage;
