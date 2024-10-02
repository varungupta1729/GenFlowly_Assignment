import React, { useState } from "react";
import { CommentType } from "../utils/types";
import { timeAgo } from "../utils/utils"; // Import the utility to format timestamp
import { PiShareFatLight } from "react-icons/pi";
import { LiaAwardSolid } from "react-icons/lia";
import { FaRegCommentAlt } from "react-icons/fa";
import { PiArrowFatDownThin } from "react-icons/pi";
import { PiArrowFatUpThin } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";
interface CommentProps {
  comment: CommentType;
  addReply: (parentId: number, content: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, addReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showChild, setShowChild] = useState(true);

  const handleReply = () => {
    if (replyContent.trim()) {
      addReply(comment.id, replyContent);
      setReplyContent("");
      setShowReplyBox(false);
    }
  };

  return (
    <div
      className={`ml-6 mt-3  ${
        comment.replies.length > 0 ? " border-l-2" : ""
      }  border-gray-300 hover:border-black p-4 pb-6 rounded-3xl`}
    >
      <div className="-mt-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center -ml-9">
            <img
              src={comment.userImage}
              alt={`${comment.username}'s avatar`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <strong>{comment.username}</strong> &bull;{" "}
              <span className="text-gray-600">
                {timeAgo(comment.timestamp)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-2">{comment.commentContent}</div>

        <div className="flex gap-4 text-black -ml-6">
          <button
            className="mt-2  rounded-full flex justify-center items-center bg-white "
            onClick={() => setShowChild(!showChild)}
          >
            {!showChild
              ? comment.replies.length > 0 && <FiPlusCircle size={20} />
              : comment.replies.length > 0 && <FiMinusCircle size={20} />}
          </button>

          <button className="mt-2 flex justify-center items-center gap-2   ">
            <PiArrowFatUpThin
              size={37}
              className=" hover:bg-[#DEE2E5] rounded-full px-2 py-1 hover:text-[#D93C04]"
            />
            {comment.upvotes}
          </button>

          <button className="mt-2 flex justify-center items-center gap-2  hover:bg-[#DEE2E5] rounded-full px-2 py-1 hover:text-[#6D5FFE]">
            <PiArrowFatDownThin size={20} />
          </button>

          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="mt-2   flex justify-center items-center gap-2 hover:bg-[#DEE2E5] rounded-full px-3 py-1 "
          >
            <FaRegCommentAlt size={20} />
            Reply
          </button>
          <button className="mt-2 flex justify-center items-center gap-2  hover:bg-[#DEE2E5] rounded-full px-3 py-1">
            <LiaAwardSolid size={25} />
            Award
          </button>
          <button className="mt-2  flex justify-center items-center gap-2 hover:bg-[#DEE2E5] rounded-full px-3 py-1 ">
            <PiShareFatLight size={25} /> Share
          </button>
          <button className="mt-2  flex justify-center items-center gap-2 hover:bg-[#DEE2E5] rounded-full px-4 py-1 ">
            <SlOptions />
          </button>
        </div>

        {showReplyBox && (
          <div className="mt-3 border hover:border-black border-gray-400 p-3 rounded-3xl">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
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
                onClick={handleReply}
                className="mt-2 bg-[#3B4E15] rounded-full text-white py-1 px-3  hover:bg-[#2a370f]"
              >
                Comment
              </button>
            </div>
          </div>
        )}
        {comment.replies.length > 0 && showChild && (
          <div className=" border-b-2 hover:border-black border-slate-400 w-full h-16 -ml-4 rounded-2xl "></div>
        )}

        <div className="-mt-7 bg-white">
          {showChild &&
            comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} addReply={addReply} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
