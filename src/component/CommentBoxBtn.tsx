import React from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { LiaAwardSolid } from 'react-icons/lia';
import { PiArrowFatDownThin, PiArrowFatUpThin, PiShareFatLight } from 'react-icons/pi';
import { SlOptions } from 'react-icons/sl';
import { CommentType } from '../utils/types';

// Define the type for the props
interface CommentBoxBtnProps {
  comment: CommentType;
  setShowReplyBox: (show: boolean) => void;
  showReplyBox: boolean;
}

const CommentBoxBtn: React.FC<CommentBoxBtnProps> = ({ comment, setShowReplyBox, showReplyBox }) => {
  return (
    <>
      <button className="mt-2 flex justify-center items-center gap-2">
        <PiArrowFatUpThin
          size={37}
          className="hover:bg-[#DEE2E5] rounded-full px-2 py-1 hover:text-[#D93C04] ml-2"
        />
        {comment.upvotes}
      </button>

      <button className="mt-2 flex justify-center items-center gap-2 hover:bg-[#DEE2E5] rounded-full px-2 py-1 hover:text-[#6D5FFE]">
        <PiArrowFatDownThin size={20} />
      </button>

      <button
        onClick={() => setShowReplyBox(!showReplyBox)}
        className="mt-2 flex justify-center items-center gap-2 hover:bg-[#DEE2E5] rounded-full px-3 py-1"
      >
        <FaRegCommentAlt size={20} />
        Reply
      </button>

      <button className="mt-2 flex justify-center items-center gap-2 hover:bg-[#DEE2E5] rounded-full px-3 py-1">
        <LiaAwardSolid size={25} />
        Award
      </button>

      <button className="mt-2 flex justify-center items-center gap-2 hover:bg-[#DEE2E5] rounded-full px-3 py-1">
        <PiShareFatLight size={25} /> Share
      </button>

      <button className="mt-2 flex justify-center items-center gap-2 hover:bg-[#DEE2E5] rounded-full px-4 py-1">
        <SlOptions />
      </button>
    </>
  );
};

export default CommentBoxBtn;
