import React, { useState } from "react";
import { switchOffShare } from "../Redux/Slice/shareSlice";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";

const Share = () => {
  const share = useSelector((state) => state.share.value);
  const dispatch = useDispatch();
  const [link, setLink] = useState(`${window.location.href}/posts/${share.payload}`);
  const shareHandler = () => {
    dispatch(switchOffShare());
  };

  const copyHandler = async() => {
     await navigator.clipboard.writeText(link);
     alert("Link Copied");
  }

  return (
    <div className="h-full w-full fixed inset-0 top-72 flex justify-center z-50 opacity-100">
      <div className="h-[250px] w-[400px] lg:w-[500px] bg-white rounded-xl px-10">
        <div className="mt-8 w-full flex justify-between">
          <h1 className="text-xl font-bold">Share</h1>
          <X onClick={shareHandler} />
        </div>
        <div className="mt-5">
          <div className="h-full flex justify-around items-center">
            <WhatsappShareButton url={link}>
              <WhatsappIcon size={60} round={true} />
            </WhatsappShareButton>
            <TwitterShareButton url={link}>
              <XIcon size={60} round={true} />
            </TwitterShareButton>
            <FacebookShareButton url={link}>
              <FacebookIcon size={60} round={true} />
            </FacebookShareButton>
             <LinkedinShareButton url={link}>
              <LinkedinIcon size={60} round={true} />
            </LinkedinShareButton>
          </div>
          <div className="mt-5 flex justify-center items-center border-2 border-gray-500 rounded-xl p-2">
             <input type="text" value={link} className="w-full m-2 outline-none"/>
             <div>
                <button className="border-2 border-gray-400 rounded-xl p-1" onClick={copyHandler}>Copy</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
