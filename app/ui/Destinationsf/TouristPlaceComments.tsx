"use client"
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

interface Props {
  placeId: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  likeCount: number;
  replyCount: number;
  isLikedByUser: boolean;
  userName?: string;
  userImage?: string;
}

interface Reply {
  id: string;
  content: string;
  createdAt: string;
  userName?: string;
  userImage?: string;
}

const TouristPlaceComments = ({ placeId }: Props) => {
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [expandedCommentId, setExpandedCommentId] = useState<string | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState('');

  // Fetch comments for the place
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?placeId=${placeId}`);
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error('Failed to fetch comments', err);
      }
    };

    if (placeId) {
      fetchComments();
    }
  }, [placeId]);

  // Add comment handler
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeId: placeId,
          content: newComment
        }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments([
          {
            ...newCommentData, 
            likeCount: 0, 
            replyCount: 0, 
            isLikedByUser: false,
            userName: user?.fullName || 'Anonymous',
            userImage: user?.imageUrl
          }, 
          ...comments
        ]);
        setNewComment('');
      }
    } catch (err) {
      console.error('Failed to add comment', err);
    }
  };

  // Toggle like on a comment
  const handleToggleLike = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST'
      });

      if (response.ok) {
        const { liked } = await response.json();
        
        // Update comments with new like status
        setComments(comments.map(comment => 
          comment.id === commentId 
            ? {
                ...comment, 
                likeCount: liked 
                  ? comment.likeCount + 1 
                  : comment.likeCount - 1,
                isLikedByUser: liked
              }
            : comment
        ));
      }
    } catch (err) {
      console.error('Failed to toggle like', err);
    }
  };

  // Fetch replies for a specific comment
  const fetchReplies = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/replies`);
      const data = await response.json();
      setReplies(data);
    } catch (err) {
      console.error('Failed to fetch replies', err);
    }
  };

  // Add reply to a comment
  const handleAddReply = async (commentId: string) => {
    if (!newReply.trim()) return;

    try {
      const response = await fetch(`/api/comments/${commentId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newReply
        }),
      });

      if (response.ok) {
        const newReplyData = await response.json();
        setReplies([newReplyData, ...replies]);
        setNewReply('');
        
        // Update reply count
        setComments(comments.map(comment => 
          comment.id === commentId 
            ? {...comment, replyCount: comment.replyCount + 1}
            : comment
        ));
      }
    } catch (err) {
      console.error('Failed to add reply', err);
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105">
    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Comments</h3>
    
    {/* Comment Input */}
    <form onSubmit={handleAddComment} className="mb-6 flex animate-slideUp">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-grow p-2 border rounded-l-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
      />
      <button 
        type="submit" 
        className="bg-blue-500 dark:bg-blue-700 text-white p-2 rounded-r-lg transition-colors hover:bg-blue-600 dark:hover:bg-blue-800"
      >
        Submit
      </button>
    </form>
  
    {/* Comments List */}
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <div 
          key={comment.id} 
          className={`bg-gray-100 dark:bg-gray-700 p-4 rounded-lg animate-slideUp`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              {comment.userImage && (
                <Image 
                  src={comment.userImage} 
                  alt={comment.userName || 'User'} 
                  width={32} 
                  height={32} 
                  className="rounded-full"
                />
              )}
              <p className="text-gray-800 dark:text-gray-200 font-semibold">{comment.userName}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Like Button */}
              <button 
                onClick={() => handleToggleLike(comment.id)}
                className={`flex items-center space-x-1 ${
                  comment.isLikedByUser 
                    ? 'text-red-500' 
                    : 'text-gray-500 dark:text-gray-300'
                }`}
              >
                <span>❤️</span>
                <span>{comment.likeCount}</span>
              </button>
  
              {/* Replies Button */}
              <button 
                onClick={() => {
                  setExpandedCommentId(
                    expandedCommentId === comment.id ? null : comment.id
                  );
                  fetchReplies(comment.id);
                }}
                className="text-blue-500 dark:text-blue-400 flex items-center space-x-1"
              >
                <span>💬</span>
                <span>{comment.replyCount}</span>
              </button>
            </div>
          </div>
  
          <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.content}</p>
  
          {/* Replies Section */}
          {expandedCommentId === comment.id && (
            <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-600 animate-slideUp">
              {/* Reply Input */}
              <div className="flex mb-4">
                <input
                  type="text"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Add a reply..."
                  className="flex-grow p-2 border rounded-l-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
                <button 
                  onClick={() => handleAddReply(comment.id)}
                  className="bg-blue-500 dark:bg-blue-700 text-white p-2 rounded-r-lg transition-colors hover:bg-blue-600 dark:hover:bg-blue-800"
                >
                  Reply
                </button>
              </div>
  
              {/* Replies List */}
              <div className="space-y-2">
                {replies.map((reply, index) => (
                  <div 
                    key={reply.id} 
                    className="bg-white dark:bg-gray-600 p-2 rounded-lg shadow-sm animate-slideUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {reply.userImage && (
                        <Image 
                          src={reply.userImage} 
                          alt={reply.userName || 'User'} 
                          width={24} 
                          height={24} 
                          className="rounded-full"
                        />
                      )}
                      <p className="text-gray-700 dark:text-gray-200 text-sm font-semibold">
                        {reply.userName || 'Anonymous'}
                      </p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
  );
};

export default TouristPlaceComments;