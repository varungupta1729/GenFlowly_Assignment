import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Comment from "../component/Comment";
import { CommentType } from "../utils/types";

const mockComment: CommentType = {
  id: 1,
  username: "Test User",
  userImage: "https://randomuser.me/api/portraits/lego/1.jpg",
  commentContent: "This is a test comment",
  timestamp: Date.now(),
  upvotes: 10,
  replies: [],
};

const mockAddReply = jest.fn();

describe("Comment Component", () => {
  test("renders comment correctly", () => {
    render(<Comment comment={mockComment} addReply={mockAddReply} />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument(); 
  });

  test("shows reply input box when 'Reply' is clicked", () => {
    render(<Comment comment={mockComment} addReply={mockAddReply} />);
    fireEvent.click(screen.getByText("Reply"));
    expect(screen.getByRole("textbox")).toBeInTheDocument(); 
  });

  test("calls addReply with correct parameters", () => {
    render(<Comment comment={mockComment} addReply={mockAddReply} />);
    fireEvent.click(screen.getByText("Reply"));
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "This is a reply" } });
    fireEvent.click(screen.getByText("Comment"));
    
    expect(mockAddReply).toHaveBeenCalledWith(mockComment.id, "This is a reply");
  });

  test("cancels reply input", () => {
    render(<Comment comment={mockComment} addReply={mockAddReply} />);
    fireEvent.click(screen.getByText("Reply"));
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "This is a reply" } });
    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument(); 
  });
});
