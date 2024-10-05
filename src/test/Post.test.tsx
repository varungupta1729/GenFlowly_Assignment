import { render, screen, fireEvent } from "@testing-library/react";
import Post from "../component/Post";
import { PostType } from "../utils/types";
// import "@testing-library/jest-dom/extend-expect";

// Sample Post data for testing
const mockPost: PostType = {
  id: 1,
  title: "Test Post Title",
  image: "https://via.placeholder.com/150",
  comments: [],
};

const mockAddPostComment = jest.fn();

describe("Post Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the post title and image", () => {
    render(<Post post={mockPost} addPostComment={mockAddPostComment} />);

    // Check if the title is rendered
    const titleElement = screen.getByText(/Test Post Title/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the image is rendered
    const imageElement = screen.getByAltText(/Test Post Title/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://via.placeholder.com/150"
    );
  });

  test("renders upvote, downvote, comment, award, and share buttons", () => {
    render(<Post post={mockPost} addPostComment={mockAddPostComment} />);

    // Check for upvote/downvote buttons
    const upvoteButton = screen.getByRole("button", { name: /111K/i });
    expect(upvoteButton).toBeInTheDocument();

    // Check for comment button
    const commentButton = screen.getByRole("button", { name: /127/i });
    expect(commentButton).toBeInTheDocument();

    // Check for share button
    const shareButton = screen.getByRole("button", { name: /Share/i });
    expect(shareButton).toBeInTheDocument();
  });

  test("opens the reply box when clicking the comment button", () => {
    render(<Post post={mockPost} addPostComment={mockAddPostComment} />);

    const commentButton = screen.getByRole("button", { name: /127/i });

    expect(screen.queryByPlaceholderText(/Add a Comment/i)).toBeInTheDocument();
    expect(screen.queryByText(/Comment/i)).not.toBeInTheDocument();

    fireEvent.click(commentButton);

    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Comment/i })
    ).toBeInTheDocument();
  });

  test("adds a comment when typing and submitting a comment", () => {
    render(<Post post={mockPost} addPostComment={mockAddPostComment} />);

    const commentButton = screen.getByRole("button", { name: /127/i });
    fireEvent.click(commentButton);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Test comment" } });

    const submitButton = screen.getByRole("button", { name: /Comment/i });
    fireEvent.click(submitButton);

    expect(mockAddPostComment).toHaveBeenCalledWith("Test comment");

    
  });

  test("cancels the comment input when clicking the Cancel button", () => {
    render(<Post post={mockPost} addPostComment={mockAddPostComment} />);

    const commentButton = screen.getByRole("button", { name: /127/i });
    fireEvent.click(commentButton);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Test comment" } });

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);

    expect(
      screen.queryByRole("button", { name: /Cancel/i })
    ).not.toBeInTheDocument();
  });

  test("does not submit an empty comment", () => {
    render(<Post post={mockPost} addPostComment={mockAddPostComment} />);

    const commentButton = screen.getByRole("button", { name: /127/i });
    fireEvent.click(commentButton);

    const submitButton = screen.getByRole("button", { name: /Comment/i });
    fireEvent.click(submitButton);

    expect(mockAddPostComment).not.toHaveBeenCalled();
  });
});
