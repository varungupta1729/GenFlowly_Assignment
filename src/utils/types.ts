export interface CommentType {
  id: number;
  username: string;
  userImage: string;
  commentContent: string;
  timestamp: number;
  upvotes: number;
  replies: CommentType[];
}

export interface PostType {
  id: number;
  title: string;
  image: string;
  comments: CommentType[];
}
