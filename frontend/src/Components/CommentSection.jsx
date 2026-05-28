import { Send, ThumbsDown, ThumbsUp, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchOff, switchOn } from "../Redux/Slice/commentSectionSlice";
import moment from "moment";

const CommentSection = () => {
  const commentSection = useSelector((state) => state.commentSection.value);
  const userProfileData = useSelector((state) => state.userProfileData.value);
  const userData = useSelector((state) => state.userData.value);
  const [text, setText] = useState("");
  const [changer, setChanger] = useState(false);
  const [comments, setComments] = useState([]);
  const [email, setEmail] = useState([]);
  const [dataArr, setDataArr] = useState([]);
  const dispatch = useDispatch();

  const commentSectionHandler = () => {
    dispatch(switchOff());
  };

  const likesHandler = async (id) => {
    try {
      let index = comments.findIndex((itr) => itr._id == id);
      let arr = comments.find((itr) => itr._id == id);
      let arr3 = comments.filter((itr) => itr._id != id);
      console.log("Array:", arr);
      if (arr.likes_count.includes(localStorage.getItem("email"))) {
        let arr2 = arr.likes_count.filter(
          (itr) => itr != localStorage.getItem("email"),
        );
        arr.likes_count = arr2;
      } else {
        arr.likes_count = [...arr.likes_count, localStorage.getItem("email")];
        if (arr.dislikes_count.includes(localStorage.getItem("email"))) {
          let arr4 = arr.dislikes_count.filter(
            (itr) => itr != localStorage.getItem("email"),
          );
          arr.dislikes_count = arr4;
        }
      }
      arr3.splice(index, 0, arr);
      setComments(arr3);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-comment`,
        {
          method: "PUT",
          body: JSON.stringify(arr),
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        },
      );

      if (!response) return;

      const data = await response.json();
      if (data.success) {
        return;
      }
      alert("Not Updated");
      return;
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  const dislikesHandler = async (id) => {
    try {
      let index = comments.findIndex((itr) => itr._id == id);
      let arr = comments.find((itr) => itr._id == id);
      let arr3 = comments.filter((itr) => itr._id != id);
      if (arr.dislikes_count.includes(localStorage.getItem("email"))) {
        let arr2 = arr.dislikes_count.filter(
          (itr) => itr != localStorage.getItem("email"),
        );
        arr.dislikes_count = arr2;
      } else {
        arr.dislikes_count = [
          ...arr.dislikes_count,
          localStorage.getItem("email"),
        ];
        if (arr.likes_count.includes(localStorage.getItem("email"))) {
          let arr4 = arr.likes_count.filter(
            (itr) => itr != localStorage.getItem("email"),
          );
          arr.likes_count = arr4;
        }
      }
      arr3.splice(index, 0, arr);
      console.log(arr);
      setComments(arr3);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-comment`,
        {
          method: "PUT",
          body: JSON.stringify(arr),
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        },
      );

      if (!response) return;

      const data = await response.json();
      if (data.success) {
        return;
      }
      alert("Not Updated");
      return;
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  const dataSetter = (arr) => {
    let arr2 = [];
    arr.map((itr) => {
      let temp = userData.payload.filter((it) => it.email == itr);
      arr2 = [...arr2, temp];
    });
    setDataArr(arr2);
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-comments/${commentSection.payload}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response) return;

      const data = await response.json();

      if (data.success) {
        console.log(data);
        setComments(data.result);
        let arr = [];
        data.result.map((itr) => {
          arr = [...arr, itr.from_user_email];
        });
        setEmail(arr);
        dataSetter(arr);
        return;
      }
      alert("Comments Not Loaded");
      return;
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  useEffect(() => {
    getComments();
  }, [changer]);

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      if (text == "") return;
      const info = {
        post_id: commentSection.payload,
        from_user_email: userProfileData.payload[0].email,
        text: text,
      };

      console.log(info);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/add-comment`,
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

      if (data.success) {
        alert("Comment Added");
        setChanger(true);
        setText("");
        return;
      }
      alert("Comment Not Added");
      return;
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  return (
    <div className="h-full w-full fixed inset-0 top-20 flex justify-center z-50 opacity-100">
      <div className="h-[500px] w-[500px] bg-white rounded-xl">
        <div className="mx-10 mt-8 flex justify-end">
          <X onClick={commentSectionHandler} />
        </div>
        <div className="mx-10 flex gap-x-4">
          <div>
            <img
              src={userProfileData.payload[0].profile_picture}
              className="h-12 w-12 lg:h-16 lg:w-16 rounded-full"
            />
          </div>
          <form
            onSubmit={submitHandler}
            className="flex justify-center items-center"
          >
            <input
              onChange={(event) => setText(event.target.value)}
              value={text}
              type="text"
              id="comment"
              placeholder="Post your Comment..."
              className="w-44 lg:w-60 outline-none border-b-2 border-black p-2"
            />
            <button className="h-12 w-12 lg:h-16 lg:w-16 flex justify-center items-center bg-black rounded-full">
              <Send color="white" />
            </button>
          </form>
        </div>

        <h1 className="m-10 mb-0 font-bold text-xl">
          {comments.length} Comments
        </h1>

        <div className="m-10 mt-5">
          {comments.map((data, index) => (
            <div
              key={data._id}
              className="mb-5 pb-4 border-b-2 border-gray-400"
            >
              {dataArr != [] && (
                <div className="flex gap-x-2">
                  <img
                    src={dataArr[index][0].profile_picture}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <div className="flex gap-x-5">
                      <h1 className="font-bold">
                        {dataArr[index][0].full_name}
                      </h1>
                      <p className="font-light">
                        {moment(data.createdAt).fromNow()}
                      </p>
                    </div>
                    <h1>{data.text}</h1>
                    <div className="flex gap-x-12 mt-2">
                      <ThumbsUp
                        size={16}
                        color={
                          data.likes_count.includes(
                            localStorage.getItem("email"),
                          )
                            ? "blue"
                            : "black"
                        }
                        onClick={() => likesHandler(data._id)}
                      />
                      <ThumbsDown
                        size={16}
                        color={
                          data.dislikes_count.includes(
                            localStorage.getItem("email"),
                          )
                            ? "red"
                            : "black"
                        }
                        onClick={() => dislikesHandler(data._id)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
