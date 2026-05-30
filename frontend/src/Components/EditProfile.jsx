import { Edit } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditButton } from "../Redux/Slice/editSlice";
import { setAlertButton } from "../Redux/Slice/alertButtonSlice";
import Alert from "./Alert";

const EditProfile = ({ data }) => {
  const [editData, setEditData] = useState(data);
  const dispatch = useDispatch();
  const updateData = async () => {
    const formData = new FormData();
    if(editData.full_name.trim() === editData.username.trim()){
       alert("Username and Full Name cannot be same");
       return;
    }
    formData.append("bio", editData.bio);
    formData.append("connections", editData.connections);
    formData.append("location", editData.location);
    formData.append("full_name", editData.full_name);
    formData.append("username", editData.username);
    formData.append("followers", editData.followers);
    formData.append("following", editData.following);
    formData.append("profile_picture", editData.profile_picture);
    formData.append("cover_photo", editData.cover_photo);
    formData.append("createdAt", editData.createdAt);
    formData.append("email", editData.email);
    formData.append("isverified", editData.isverified);
    formData.append("posts", editData.posts);
    formData.append("stories", editData.stories);
    formData.append("updatedAt", editData.updatedAt);
    formData.append("_id", editData._id);
    console.log(Object.fromEntries(formData.entries()));
    try {
      const response = await fetch(`/api/profile/update-data`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!response) {
        console.log("Error.....");
        return;
      }

      const data = await response.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("user", editData.username);
        localStorage.setItem("name", editData.full_name);
        dispatch(setAlertButton("Profile Updated"));
        return;
      } else {
        dispatch(setAlertButton("Profile Not Updated"));
        return;
      }
    } catch (error) {
      dispatch(setAlertButton(error.message));
      return;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    updateData();
    dispatch(setEditButton());
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    dispatch(setEditButton());
  };

  return (
    <div className="flex justify-center overflow-y-scroll rounded-xl rounded-r-none bg-white items-start ">
      <div className="h-[500px] w-[300px] lg:h-[600px] lg:w-[600px] p-2 lg:p-5">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <form encType="multipart/form-data">
          <div className="mt-5">
            <h1 className="font-semibold mb-2">Profile Picture</h1>
            <label
              htmlFor="profile-photo"
              className="group h-20 w-20 flex justify-center items-center rounded-full transition-opacity border-0 opacity-100 hover:opacity-70"
              style={{
                backgroundImage: data.profile_picture
                  ? `url(${data.profile_picture})`
                  : `url(https://ik.imagekit.io/priyanshu61103/profile-logo.png)`,
                backgroundSize: "cover",
              }}
            >
              <div className="hidden group-hover:inline-block">
                <Edit />
              </div>
            </label>
            <input
              type="file"
              id="profile-photo"
              className="hidden"
              onChange={(event) =>
                setEditData({
                  ...editData,
                  profile_picture: event.target.files[0],
                })
              }
            />
          </div>

          <div className="mt-5">
            <h1 className="font-semibold mb-2">Cover Photo</h1>
            <label
              htmlFor="cover-photo"
              className="group h-32 w-52 lg:h-48 lg:w-80 rounded-xl flex justify-center transition-opacity items-center border-0 opacity-100 hover:opacity-70"
              style={{
                backgroundImage: data.cover_photo
                  ? `url(${data.cover_photo})`
                  : `url(https://ik.imagekit.io/priyanshu61103/sample_cover.jpg)`,
                backgroundSize: "cover",
              }}
            >
              <div className="hidden group-hover:inline-block">
                <Edit />
              </div>
            </label>
            <input
              type="file"
              id="cover-photo"
              className="hidden"
              onChange={(event) =>
                setEditData({ ...editData, cover_photo: event.target.files[0] })
              }
            />
          </div>

          <div className="mt-5">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              value={editData.full_name}
              className="h-8 p-6 w-full border-2 border-gray-300 font-semibold rounded-lg outline-none"
              onChange={(event) =>
                setEditData({ ...editData, full_name: event.target.value })
              }
            />
          </div>

          <div className="mt-5">
            <label className="font-semibold">Username</label>
            <input
              type="text"
              value={editData.username}
              className="h-8 p-6 w-full border-2 border-gray-300 font-semibold rounded-lg outline-none"
              onChange={(event) =>
                setEditData({ ...editData, username: event.target.value })
              }
            />
          </div>

          <div className="mt-5">
            <label className="font-semibold">Bio</label>
            <textarea
              type="text"
              value={editData.bio}
              className="h-auto p-6 w-full border-2 border-gray-300 font-semibold rounded-lg outline-none"
              onChange={(event) =>
                setEditData({ ...editData, bio: event.target.value })
              }
            ></textarea>
          </div>

          <div className="mt-5">
            <label className="font-semibold">Location</label>
            <input
              type="text"
              value={editData.location}
              className="h-8 p-6 w-full border-2 border-gray-300  font-semibold rounded-lg outline-none"
              onChange={(event) =>
                setEditData({ ...editData, location: event.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-x-4 mt-2 mb-5">
            <button
              onClick={cancelHandler}
              className="h-fit w-fit p-2 flex justify-center items-center border-2 border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={submitHandler}
              className="h-fit w-fit p-2 flex justify-center items-center text-white bg-black rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
