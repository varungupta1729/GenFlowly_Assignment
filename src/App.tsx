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
      username: "User_" + Date.now(),
      userImage: "https://randomuser.me/api/portraits/women/" + + Math.floor(Math.random() * 10 ) % 20 +".jpg",
      commentContent: content,
      timestamp: new Date().getTime(),
      upvotes: 0,
      replies: [],
    };

    setPost({ ...post, comments: [newComment, ...post.comments] });
  };

  const addReply = (parentId: number, content: string) => {
    let parentComment: CommentType | null = null;
   
    // Here Sir we recusrsively find out the node in the tree where we have to attach this node 
    const addReplyRecursive = (comments: CommentType[]): CommentType[] => {
      return comments.map((comment) => {
        if (comment.id === parentId) {   //Here Sir we get the node

          //Here sir we are creating the node object with the comment content
          parentComment = {
            ...comment,
            replies: [
             
              {
                id: Date.now(),
                username: "User_" + Date.now(),
                userImage: "https://randomuser.me/api/portraits/men/" + Math.floor(Math.random() * 10 ) % 20 + ".jpg",
                commentContent: content,
                timestamp: new Date().getTime(),
                upvotes: 0,
                replies: [],
              },
              ...comment.replies,
            ],
          };
          return parentComment;
        }

        // if node is not finded then recursively call to other nodes
        return {
          ...comment,
          replies: addReplyRecursive(comment.replies),
        };
      });
    };
    // Here sir we set the updated content of the post
    const updatedComments = addReplyRecursive(post.comments);
    setPost({ ...post, comments: updatedComments });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 mb-10 w-full flex flex-col justify-center items-center">
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
