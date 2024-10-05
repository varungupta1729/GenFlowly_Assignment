import { useState } from "react";
import { PostType } from "../utils/types";
import { PiShareFatLight } from "react-icons/pi";
import { LiaAwardSolid } from "react-icons/lia";
import { FaRegCommentAlt } from "react-icons/fa";
import { PiArrowFatDownThin } from "react-icons/pi";
import { PiArrowFatUpThin } from "react-icons/pi";

interface PostProps {
  post: PostType;
  addPostComment: (content: string) => void;
}

const Post: React.FC<PostProps> = ({ post, addPostComment }) => {
  const [postCommentContent, setPostCommentContent] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handlePostComment = () => {
    if (postCommentContent.trim()) {
      addPostComment(postCommentContent);
      setPostCommentContent("");
      setShowReplyBox(false);
    }
  };

  return (
    <div className=" p-4 rounded-lg mb-4 flex flex-col gap-4  w-full ">
      <h1 className="text-2xl font-bold w-full">{post.title}</h1>
      <div
        className="w-full h-[55vh] rounded-[30px]"
        style={{
          backgroundImage: `url(${post.image})`,

          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-[30px] h-full object-contain bg-[#000000e2]  "
        />
      </div>
      <div className="flex gap-4 text-black ">
        <button className="mt-2 flex justify-center items-center bg-[#DEE2E5] rounded-full  ">
          <PiArrowFatUpThin
            size={37}
            className=" bg-[#DEE2E5] rounded-full px-2 py-1 hover:text-[#D93C04]"
          />
          111K{" "}
          <PiArrowFatDownThin
            size={37}
            className=" bg-[#DEE2E5] rounded-full px-2 py-1 hover:text-[#6D5FFE]"
          />
        </button>

        <button
          onClick={() => setShowReplyBox(!showReplyBox)}
          className="mt-2   flex justify-center items-center gap-2 bg-[#DEE2E5] rounded-full px-2 py-1 "
        >
          <FaRegCommentAlt size={20} />
          127
        </button>
        <button className="mt-2 flex justify-center items-center gap-2  bg-[#DEE2E5] rounded-full px-2 py-1">
          <LiaAwardSolid size={25} />
        </button>
        <button className="mt-2  flex justify-center items-center gap-2 bg-[#DEE2E5] rounded-full px-2 py-1 ">
          <PiShareFatLight size={25} /> Share
        </button>
      </div>

      <div className="">
        {!showReplyBox && (
          <input
            type="text"
            className="border w-full rounded-full px-5 py-2"
            placeholder="Add a Comment"
            onClick={() => setShowReplyBox(!showReplyBox)}
          />
        )}
        {showReplyBox && (
          <div className="mt-3 border border-gray-400 p-3 rounded-3xl">
            <textarea
              value={postCommentContent}
              onChange={(e) => setPostCommentContent(e.target.value)}
              className="border-none outline-none border-gray-300 p-2 rounded-lg w-full"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReplyBox(!showReplyBox)}
                className="mt-2 text-black bg-[#DEE2E5] hover:bg-[#bfc2c4]  py-1 px-3 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handlePostComment}
                className="mt-2 bg-[#3B4E15] rounded-full text-white py-1 px-3  hover:bg-[#2a370f]"
              >
                Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
