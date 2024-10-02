import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { initialPost } from "../utils/data";

describe("App Component", () => {
  test("renders initial post and comments", () => {
    render(<App />);
    expect(screen.getByText(initialPost.title)).toBeInTheDocument(); 
    expect(screen.getByText(initialPost.comments[0].commentContent)).toBeInTheDocument(); 
  });

  test("adds a new comment", () => {
    render(<App />);
    const commentInput = screen.getByPlaceholderText("Add a Comment"); 
    fireEvent.click(commentInput);
    const replyInput = screen.getByRole("textbox");
    fireEvent.change(replyInput, { target: { value: "New Comment" } });
    fireEvent.click(screen.getByText("Comment")); 

    expect(screen.getByText("New Comment")).toBeInTheDocument();
  });

  test("adds a reply to a comment", () => {
    render(<App />);
    const multipleReply = screen.getAllByText('Reply')
    fireEvent.click(multipleReply[0]); 
    const replyInput = screen.getAllByRole('textbox')
    fireEvent.change(replyInput[1], { target: { value: "Hello" } });
    fireEvent.click(screen.getByText("Comment")); 

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
