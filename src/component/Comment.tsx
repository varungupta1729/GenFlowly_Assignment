import React, { useState } from "react";
import { CommentType } from "../utils/types";
import { timeAgo } from "../utils/utils";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import CommentBoxBtn from "./CommentBoxBtn";

interface CommentProps {
  comment: CommentType;
  addReply: (parentId: number, content: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, addReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showChild, setShowChild] = useState(!(comment.id > 200));
  const [showChildComment, setShowChildComment] = useState(false);

  const handleReply = () => {
    if (replyContent.trim()) {
      addReply(comment.id, replyContent);
      setReplyContent("");
      setShowReplyBox(false);

      setShowChild(true);
      setShowChildComment(true);
    }
  };

  const toggleReplies = () => {
    if (comment.replies.length > 1) {
      if (!showChild) {
        setShowChild(true);
      }
      setShowChildComment(!showChildComment);
    } else {
      setShowChild(!showChild);
      setShowChildComment(!showChildComment);
    }
  };

  const handleLeftToggle = () => {
    setShowChild(!showChild);
    setShowChildComment(!showChildComment);
  };

  return (
    <div
      className={`ml-6 mt-10  ${
        comment.replies.length > 0 ? "border-l-2" : ""
      } border-gray-300 hover:border-black p-4 pb-6 rounded-3xl border-bottom bg-white text-[0.9rem]`}
    >
      <div className="-mt-9 bg-white">
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

        <div className="mt-2 ml-4">{comment.commentContent}</div>

        <div className="flex gap-2 text-black -ml-6">
          <button
            className="mt-2  rounded-full flex justify-center items-center bg-white"
            onClick={handleLeftToggle}
          >
            {!showChild ? (
              comment.replies.length > 1 && 
              !(comment.id > 200) && <FiPlusCircle size={20} />
            ) : (
              <FiMinusCircle size={20} />
            )}
          </button>

          <CommentBoxBtn
            comment={comment}
            showReplyBox={showReplyBox}
            setShowReplyBox={setShowReplyBox}
          />
        </div>

        {showReplyBox && (
          <div className="mt-3 border hover:border-black border-gray-400 p-3 rounded-3xl relative Z-20">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="border-none outline-none border-gray-300 p-2 rounded-lg w-full"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReplyBox(!showReplyBox)}
                className="mt-2 text-black bg-[#DEE2E5] hover:bg-[#bfc2c4] py-1 px-3 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                className="mt-2 bg-[#3B4E15] rounded-full text-white py-1 px-3 hover:bg-[#2a370f]"
              >
                Comment
              </button>
            </div>
          </div>
        )}

        <div className="-mt-7 bg-white">
          {!showChildComment &&
            showChild &&
            comment.replies.slice(0, 1).map((reply) => (
              <>
                {comment.replies.length > 0 && showChild && (
                  <div className="border-b-2 hover:border-black border-slate-400 w-full h-10 -mb-10 mt-3 -ml-4 rounded-full"></div>
                )}
                <Comment key={reply.id} comment={reply} addReply={addReply} />
              </>
            ))}
          {showChildComment &&
            showChild &&
            comment.replies.map((reply) => (
              <>
                {comment.replies.length > 0 && showChild && (
                  <div className="border-b-2 hover:border-black border-slate-400 w-full h-16 -mb-10 mt-3  -ml-4 rounded-full"></div>
                )}
                <Comment key={reply.id} comment={reply} addReply={addReply} />
              </>
            ))}

          {!showChildComment && showChild && comment.replies.length > 1 ? (
            <div
              className="relative mt-2 -bottom-9 left-1 flex items-center gap-2 text-gray-600 cursor-pointer"
              onClick={() => setShowChildComment(!showChildComment)}
            >
              <FiPlusCircle size={20} /> {comment.replies.length - 1} more
              replies
            </div>
          ) : (
            comment.replies.length > 0 && (
              <div
                className="relative mt-2 -bottom-9 left-1 flex items-center gap-2 text-gray-600"
                onClick={toggleReplies}
              >
                {showChildComment &&
                comment.replies.length === 1 &&
                !(comment.id > 2) ? (
                  <span className="flex items-center gap-2 cursor-pointer">
                    <FiPlusCircle size={20} /> 1 more reply
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {showChild ? (
                      <span className="flex items-center gap-2 cursor-pointer">
                        {" "}
                        <FiMinusCircle size={20} /> See less
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 cursor-pointer">
                        {" "}
                        <FiPlusCircle size={20} />
                        {comment.replies.length} more replies
                      </span>
                    )}
                  </span>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
