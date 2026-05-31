import React, { useState } from "react";
import { ArrowBigLeft } from "lucide-react";
import { Text } from "lucide-react";
import { Upload } from "lucide-react";
import { Sparkle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { switchOff } from "../Redux/Slice/storySlice";
import { useNavigate } from "react-router";
const CreateStory = () => {
  const bgColor = [
    "#134CAE",
    "rgb(95, 77, 255)",
    "rgb(255, 67, 208)",
    "rgb(255, 67, 67)",
    "rgb(255, 230, 0)",
    "rgb(112, 206, 5)",
  ];
  const textColor = [
    "#D7DBE4",
    "#DDBAFF",
    "#FFB8E4",
    "#FF8B8B",
    "rgb(255, 245, 151)",
    "rgb(211, 255, 160)",
  ];
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [textBox, setTextBox] = useState(true);
  const [text, setText] = useState("");
  const [upload, setUpload] = useState(null);
  const profileData = useSelector((state) => state.profileData.value);
  const navigate = useNavigate();
  const colorHandler = (itr) => {
    setIndex(itr);
  };

  const boxHandler = () => {
    setTextBox(!textBox);
  };

  const storyHandler = async (event) => {
    try {
      console.log("TextBox:",textBox);
      event.preventDefault();
      if (text.trim() == "" && !upload) {
        alert("Please Attach Something to Upload");
        return;
      }
      const formData = new FormData();
      formData.append("user", profileData.payload[0].email);
      if (textBox) {
        formData.append("content", text);
        formData.append("media_type", "text");
      } 
      else {
        formData.append("media_url",upload);
        if (upload.type == "video/mp4" || upload.type == "video/mp3")
          formData.append("media_type", "video");
        else formData.append("media_type", "image");
      }
      formData.append("background_color", bgColor[index]);

      const response = await fetch(`/api/create-story`, {
        credentials: "include",
        method: "POST",
        body: formData,
      });

      if (!response) return;

      const data = await response.json();
      if (data.success) {
        console.log(data.result);
        alert("Story Posted Successfully");
        navigate("/");
        return;
      } else {
        alert("Story Not Posted Successfully");
        return;
       }
    } catch (error) {
      alert(error.message);
      return;
    }
  };
  return (
    <div className="lg:h-[420px] lg:w-[420px] h-80 w-80 fixed inset-0 top-8 lg:top-0 flex lg:justify-center z-50 opacity-100 ml-3 lg:ml-0">
      <div className="h-fit">
        <div className="h-12 w-72 lg:w-96 flex gap-x-28 lg:gap-x-40 items-center mb-3">
          <div onClick={() => dispatch(switchOff())}>
            <ArrowBigLeft />
          </div>
          <h1 className="text-gray-600 font-bold text-md lg:text-lg">Create Story</h1>
        </div>
        <form action="" onSubmit={storyHandler}>
          <textarea
            name=""
            id=""
            rows="15"
            cols="35"
            placeholder="What's on your mind ?"
            className="rounded-lg lg:p-5 p-2 placeholder:text-lg placeholder:font-semibold"
            style={{
              backgroundColor: `${bgColor[index]}`,
              "--placeholder-color": textColor[index],
            }}
            onChange={(event) => setText(event.target.value)}
          ></textarea>
          <div className="flex gap-x-2">
            {bgColor.map((color, itr) => (
              <div
                onClick={() => colorHandler(itr)}
                className="h-10 w-10 rounded-full border-2 border-black"
                style={{ backgroundColor: `${color}` }}
              ></div>
            ))}
          </div>
          {textBox && (
            <div className="flex my-10 gap-x-4">
              <button className="h-15 lg:w-60 w-40 p-2 bg-white text-black font-semibold flex gap-x-2 justify-center items-center text-xl rounded-lg">
                <Text color="black" />
                Text
              </button>
              <label
                htmlFor="photo-video"
                className="h-15 lg:w-60 w-40 p-2 bg-black text-white font-semibold flex gap-x-2 justify-center items-center text-xl rounded-lg"
              >
                <Upload />
                Photo/Video
              </label>
            </div>
          )}
          {!textBox && (
            <div className="flex my-10 gap-x-4">
              <button
                onClick={boxHandler}
                className="h-15 lg:w-60 w-40 p-2 bg-black text-white font-semibold flex gap-x-2 justify-center items-center text-xl rounded-lg"
              >
                <Text />
                Text
              </button>
              <label
                className="h-15 lg:w-60 w-40 p-2 bg-white text-black font-semibold flex gap-x-2 justify-center items-center text-xl rounded-lg"
              >
                <Upload color="black" />
                Photo/Video
              </label>
            </div>
          )}
          <input
                type="file"
                onClick={boxHandler}
                onChange={(event) => {
                  setUpload(event.target.files[0]);
                }}
                name="photo-video"
                id="photo-video"
                className="hidden"
              />
          <div>
            <button
              className="h-15 p-2 lg:p-4 lg:w-[515px] w-[340px] rounded-lg text-lg font-semibold flex justify-center gap-x-2 text-gray-200 items-center bg-purple-600"
            >
              <Sparkle />
              Create Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStory;
