import { PostType } from "./types";

export const initialPost: PostType = {
  id: 1,
  title:
    "Virat Kohli gifted his bat to Shakib Al Hasan, who is set to retire from Test cricket at home this month.",
  image: "https://i.redd.it/x5maxi5ju4sd1.jpeg",
  comments: [
    {
      id: 101,
      username: "Alice",
      userImage: "https://randomuser.me/api/portraits/women/1.jpg",
      timestamp: new Date().getTime() - 3600 * 1000,
      commentContent: "This is the first comment",
      upvotes: 10,
      replies: [
        {
          id: 201,
          username: "John",
          userImage: "https://randomuser.me/api/portraits/men/2.jpg",
          timestamp: new Date().getTime() - 1800 * 1000,
          commentContent: "This is a reply to Alice's comment",
          upvotes: 4,
          replies: [
            {
              id: 301,
              username: "Zara",
              userImage: "https://randomuser.me/api/portraits/women/4.jpg",
              timestamp: new Date().getTime() - 300 * 1000, // 5 minutes ago
              commentContent: "This is a nested reply to Carol's reply",
              upvotes: 0,
              replies: [],
            },
          ],
        },
        {
          id: 202,
          username: "Emily",
          userImage: "https://randomuser.me/api/portraits/women/2.jpg",
          timestamp: new Date().getTime() - 1200 * 1000,
          commentContent: "This is a reply to Alice's comment",
          upvotes: 2,
          replies: [],
        },
      ],
    },
    {
      id: 102,
      username: "Bob",
      userImage: "https://randomuser.me/api/portraits/men/3.jpg",
      timestamp: new Date().getTime() - 7200 * 1000,
      commentContent: "This is the second comment",
      upvotes: 5,
      replies: [
        {
          id: 202,
          username: "Carol",
          userImage: "https://randomuser.me/api/portraits/women/3.jpg",
          timestamp: new Date().getTime() - 3600 * 1000, // 1 hour ago
          commentContent: "This is a reply to Bob's comment",
          upvotes: 3,
          replies: [
            {
              id: 302,
              username: "David",
              userImage: "https://randomuser.me/api/portraits/men/4.jpg",
              timestamp: new Date().getTime() - 600 * 1000, // 10 minutes ago
              commentContent: "This is a nested reply to Carol's reply",
              upvotes: 1,
              replies: [],
            },
            {
              id: 303,
              username: "Zara",
              userImage: "https://randomuser.me/api/portraits/women/4.jpg",
              timestamp: new Date().getTime() - 300 * 1000, // 5 minutes ago
              commentContent: "This is a nested reply to Carol's reply",
              upvotes: 0,
              replies: [],
            },
          ],
        },
        {
          id: 202,
          username: "Emily",
          userImage: "https://randomuser.me/api/portraits/women/2.jpg",
          timestamp: new Date().getTime() - 1200 * 1000,
          commentContent: "This is a nested reply to John's reply",
          upvotes: 2,
          replies: [],
        },
      ],
    },
  ],
};
