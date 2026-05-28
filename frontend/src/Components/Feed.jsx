import React from "react";
import Story from "./Story";
import Sponsered from "./Sponsered";
import { useSelector } from "react-redux";
import Posts from "./Posts";
import { Check } from "lucide-react";
import ConnectionsTab from "./ConnectionsTab";

const Feed = () => {
  const storyButton = useSelector((state) => state.storyButton.value);
  const commentSection = useSelector((state) => state.commentSection.value);
  const share = useSelector((state) => state.share.value);
  return (
    <div className="z-0">
      <div
        className={
          !storyButton && commentSection == "" && share == ""
            ? "flex w-[345px] lg:w-[660px] relative left-0 lg:left-80 ml-7 top-10 overflow-x-hidden z-10"
            : "flex w-[345px] lg:w-[660px] relative left-0 lg:left-80 ml-7 top-10 overflow-x-hidden opacity-10 z-10"
        }
      >
        <div className="flex flex-col">
          <Story />
          <Posts />
        </div>
        <div className="hidden fixed inset-y-0 top-10 left-[1020px] lg:flex flex-col gap-4">
          <Sponsered />
          <ConnectionsTab />
        </div>
      </div>
    </div>
  );
};

export default Feed;
