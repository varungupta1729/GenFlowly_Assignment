// CommentBoxBtn.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; 
import CommentBoxBtn from '../component/CommentBoxBtn';
import { CommentType } from '../utils/types';

// Mock data for the comment
const mockComment: CommentType = {
  id: 1,
  username: 'Test User',
  userImage: 'test-user-image.jpg',
  commentContent: 'This is a test comment',
  timestamp: 73,
  upvotes: 12,
  replies: [],
};

describe('CommentBoxBtn Component', () => {
  test('should render all buttons correctly', () => {
    render(<CommentBoxBtn comment={mockComment} setShowReplyBox={jest.fn()} showReplyBox={false} />);

    // Check if all buttons are rendered with correct labels or icons
    expect(screen.getByText('Reply')).toBeInTheDocument();
    expect(screen.getByText('Award')).toBeInTheDocument();
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  test('should display the correct number of upvotes', () => {
    render(<CommentBoxBtn comment={mockComment} setShowReplyBox={jest.fn()} showReplyBox={false} />);

    // Check if the upvotes count is correctly displayed
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  test('should toggle reply box when the reply button is clicked', () => {
    const setShowReplyBoxMock = jest.fn();

    render(<CommentBoxBtn comment={mockComment} setShowReplyBox={setShowReplyBoxMock} showReplyBox={false} />);

    // Simulate clicking on the reply button
    const replyButton = screen.getByText('Reply');
    fireEvent.click(replyButton);

    // Check if the `setShowReplyBox` was called
    expect(setShowReplyBoxMock).toHaveBeenCalledWith(true);
  });

  test('should call setShowReplyBox with false if reply box is already shown', () => {
    const setShowReplyBoxMock = jest.fn();

    render(<CommentBoxBtn comment={mockComment} setShowReplyBox={setShowReplyBoxMock} showReplyBox={true} />);

    // Simulate clicking on the reply button again to close the reply box
    const replyButton = screen.getByText('Reply');
    fireEvent.click(replyButton);

    // Check if the `setShowReplyBox` was called to close the reply box
    expect(setShowReplyBoxMock).toHaveBeenCalledWith(false);
  });

 
});
