import React, { useState } from "react";
import { initialPost } from "./utils/data";
import { CommentType, PostType } from "./utils/types";
import Comment from "./component/Comment";
import Post from "./component/Post";
import "./App.css";

const App: React.FC = () => {
  const [post, setPost] = useState<PostType>(initialPost);

  const addPostComment = (content: string) => {
    const newComment: CommentType = {
      id: Date.now(),
      username: "User" + Date.now(),
      userImage: "https://randomuser.me/api/portraits/lego/1.jpg",
      commentContent: content,
      timestamp: new Date().getTime(),
      upvotes: 0,
      replies: [],
    };

    setPost({ ...post, comments: [newComment, ...post.comments] });
  };

  const addReply = (parentId: number, content: string) => {
    let parentComment: CommentType | null = null;

    const addReplyRecursive = (comments: CommentType[]): CommentType[] => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          parentComment = {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(),
                username: "User" + Date.now(),
                userImage: "https://randomuser.me/api/portraits/lego/1.jpg",
                commentContent: content,
                timestamp: new Date().getTime(),
                upvotes: 0,
                replies: [],
              },
            ],
          };
          return parentComment;
        }
        return {
          ...comment,
          replies: addReplyRecursive(comment.replies),
        };
      });
    };

    const updatedComments = addReplyRecursive(post.comments);
    setPost({ ...post, comments: updatedComments });
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-10 w-full flex flex-col justify-center items-center">
      <Post post={post} addPostComment={addPostComment} />

      <div className="mt-6 w-full ">
        {post.comments.map((comment: CommentType) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} />
        ))}
      </div>
    </div>
  );
};

export default App;
