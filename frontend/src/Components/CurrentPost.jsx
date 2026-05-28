import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Sponsered from "./Sponsered";
import RecentMessages from "./ConnectionsTab";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../Redux/Slice/profileDataSlice";
import { setUserProfileData } from "../Redux/Slice/userProfileDataSlice";
import { useParams } from "react-router";
import { setUserData } from "../Redux/Slice/userDataSlice";
import { Link } from "react-router";
import moment from "moment";
import {
  Heart,
  MessageCircle,
  Send,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { switchOff, switchOn } from "../Redux/Slice/commentSectionSlice";
import { switchOffShare, switchOnShare } from "../Redux/Slice/shareSlice";
import CommentSection from "./CommentSection";
import Share from "./Share";
import Loader from "./Loader";
const CurrentPost = () => {
  const userProfileData = useSelector((state) => state.userProfileData.value);
  const profileData = useSelector((state) => state.profileData.value);
  const [postData, setPostData] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const emailId = localStorage.getItem("email");
  let contentArray = [];
  const [arr, setArr] = useState([]);
  const commentSection = useSelector((state) => state.commentSection.value);
  const share = useSelector((state) => state.share.value);
  const editButton = useSelector((state) => state.editButton.value);
  const userData = useSelector((state) => state.userData.value);
  const [text, setText] = useState("");
  const [changer, setChanger] = useState(false);
  const [comments, setComments] = useState([]);
  const [email, setEmail] = useState([]);
  const [dataArr, setDataArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const commentSectionHandler = (id) => {
    if (commentSection) dispatch(switchOff());
    else dispatch(switchOn(id));
  };

  const shareHandler = (id) => {
    if (share) dispatch(switchOffShare());
    else dispatch(switchOnShare(id));
  };

  const getUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users-data`,
        {
          credentials: "include",
        },
      );
      if (!response) {
        alert("Error");
        return;
      }
      const data = await response.json();
      if (data.success) {
        let temp = [];
        dispatch(setUserData(data.result));
        data.result.forEach((info) => {
          if (info.posts.includes(id)) {
            temp[0] = info;
          }
        });

        setArr(temp);
      }
    } catch (error) {
      console.log(error.message);
      alert("Error");
      return;
    }
  };

  const postReactionHandler = async (id, likes_count) => {
    try {
      let likes = [];
      if (likes_count.includes(localStorage.getItem("email"))) {
        likes = likes_count.filter(
          (itr) => itr != localStorage.getItem("email"),
        );
      } else {
        likes = [...likes_count, localStorage.getItem("email")];
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-likes`,
        {
          method: "PUT",
          body: JSON.stringify({ id, likes }),
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        },
      );

      if (!response) return;

      const data = await response.json();

      if (data.success) {
        let index = postData.findIndex((itr) => itr._id == id);
        let arr = postData.filter((itr) => itr._id == id);
        arr[0].likes_count = likes;
        let arr2 = postData.filter((itr) => itr._id != id);
        arr2.splice(index, 0, arr[0]);
        setPostData(arr2);
        return;
      }
      alert("Likes Not Updated");
      return;
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  const getPost = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-post/${id}`,
        {
          credentials: "include",
        },
      );

      if (!response) return;

      const data = await response.json();
      if (data.success) {
        setPostData(data.result);
        getUserData();
        return;
      }
      alert("Post Not Loaded");
      return;
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  const getProfileData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/profile`,
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({ email: emailId }),
          headers: {
            "content-type": "application/json",
          },
        },
      );
      if (!response) {
        alert("Error");
        return;
      }
      const data = await response.json();
      if (data.success) {
        dispatch(setProfileData(data.result));
        dispatch(setUserProfileData(data.result));
        return;
      } else {
        alert("Error");
        return;
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
      return;
    }
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
        `${import.meta.env.VITE_BACKEND_URL}/get-comments/${id}`,
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
    setIsLoading(true);
    getProfileData();
    getPost();
  }, []);

  return (
    <div className="h-fit pb-10 w-[1500px] bg-gray-200">
      {!isLoading && (
        <div>
          <div>
            <Sidebar />
          </div>
          <div
            className={
              commentSection == "" && share == ""
                ? "flex w-[800px] relative left-80 ml-7 top-10 overflow-x-hidden"
                : "flex w-[800px] relative left-80 ml-7 top-10 overflow-x-hidden opacity-10"
            }
          >
            <div>
              <div
                key={postData._id}
                className="h-fit bg-white rounded-lg text-black p-5 my-10 z-30"
                style={{ width: "740px" }}
              >
                {arr[0] && (
                  <div>
                    <Link to={`/profile/${arr[0].email}`}>
                      <div className="w-fit p-2 pl-0 rounded-xl flex gap-x-2 hover:bg-gray-1x00">
                        <img
                          src={
                            arr[0].profile_picture
                              ? arr[0].profile_picture
                              : "../../assets/sample_profile.jpg"
                          }
                          alt=""
                          className="h-16 w-16 rounded-full"
                        />
                        <div>
                          <h1 className="font-bold text-lg">
                            {arr[0].full_name}
                          </h1>
                          <div className="flex justify-center items-center gap-x-2 text-gray-600 text-sm font-semibold">
                            <p>@{arr[0].username}</p>
                            <div className="h-1 w-1 rounded-full bg-gray-600"></div>
                            <p>{moment(postData.createdAt).fromNow()}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="hidden">
                      {(contentArray = postData.content.split(" "))}
                    </div>
                    <div>
                      <div className="w-full my-5 flex flex-wrap text-black gap-x-1">
                        {contentArray.map((info, index) => (
                          <div key={index}>
                            <h1
                              className="font-semibold"
                              style={
                                info.includes("#")
                                  ? { color: "blue" }
                                  : { color: "black" }
                              }
                            >
                              {info}
                            </h1>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      {postData.post_type != "text" && (
                        <img src={postData.image_urls[0]} alt="" />
                      )}
                    </div>
                    <div className="h-1 w-full bg-gray-300 rounded-full my-5"></div>
                    <div className="flex gap-x-4">
                      <div
                        onClick={() =>
                          postReactionHandler(
                            postData._id,
                            postData.likes_count,
                          )
                        }
                        className="flex gap-x-2"
                      >
                        {postData.likes_count.includes(
                          localStorage.getItem("email"),
                        ) ? (
                          <Heart color="red" />
                        ) : (
                          <Heart color="gray" />
                        )}
                      </div>
                      <div
                        onClick={() => commentSectionHandler(postData._id)}
                        className="flex gap-x-2"
                      >
                        <MessageCircle color="gray" />
                      </div>
                      <div
                        onClick={() => shareHandler(postData._id)}
                        className="flex gap-x-2"
                      >
                        <Share2 color="gray" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <div className="mx-10 flex gap-x-4">
                    <div>
                      {userProfileData && userProfileData.payload && (
                        <img
                          src={userProfileData.payload[0].profile_picture}
                          className="h-16 w-16 rounded-full"
                        />
                      )}
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
                        className="w-[500px] outline-none bg-gray-200 border-b-2 border-black p-2"
                      />
                      <button className="h-16 w-16 flex justify-center items-center bg-black rounded-full">
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
                            {dataArr[index][0] && (
                              <div>
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
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-y-0 top-10 right-2 flex flex-col gap-4">
              <Sponsered />
              <RecentMessages />
            </div>
          </div>
          <div>
            {commentSection != "" && <CommentSection />}
            {share != "" && <Share />}
          </div>
        </div>
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default CurrentPost;
