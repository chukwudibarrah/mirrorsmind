// components/ViewComments.tsx

"use client";

import { useState } from "react";
import { format } from "date-fns";
import { neuecomic } from "@/styles/fonts";
import AddComments from "./AddComments";

interface Comment {
  _id: string;
  text: string;
  name: string;
  createdAt: string;
  issueId: string; // Added issueId
  parent?: { _id: string } | null;
  replies?: Comment[];
}

interface ViewCommentsProps {
  comments: Comment[];
  isLoading: boolean;
  onReply: (parentId: string | null) => void; // Changed to accept null
  replyingToId: string | null;
}

export default function ViewComments({
  comments,
  isLoading,
  onReply,
  replyingToId,
}: ViewCommentsProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="lg:w-5/12 px-3">
          <p className="sub-text">Loading comments...</p>
        </div>
      </div>
    );
  }

  // Function to build nested comments
  const buildNestedComments = (comments: Comment[]) => {
    const commentMap: { [key: string]: Comment } = {};
    const roots: Comment[] = [];

    comments.forEach((comment) => {
      commentMap[comment._id] = { ...comment, replies: [] };
    });

    comments.forEach((comment) => {
      if (comment.parent?._id) {
        const parentComment = commentMap[comment.parent._id];
        if (parentComment) {
          parentComment.replies?.push(commentMap[comment._id]);
        }
      } else {
        roots.push(commentMap[comment._id]);
      }
    });

    return roots;
  };

  const nestedComments = buildNestedComments(comments);

  const renderComments = (comments: Comment[]) => {
    return comments.map((comment) => (
      <div key={comment._id} className="mb-4">
        <div className="bg-white p-4 rounded-lg shadow-2xl">
          <div className="flex justify-between items-start mb-2">
            <span className="sub-text">{comment.name}</span>
            <span className="flex space-x-2">
              <span className="sub-text text-white bg-black rounded-xl py-1 px-2">
                {comment.createdAt
                  ? format(new Date(comment.createdAt), "Pp")
                  : ""}
              </span>
              <button
                className="md:block hidden sub-text text-white bg-black rounded-xl py-1 px-2"
                onClick={() => onReply(comment._id)}
              >
                Reply
              </button>
            </span>
          </div>
          <p className="body-text whitespace-pre-wrap">{comment.text}</p>
        </div>
        {/* Render reply form if this comment is being replied to */}
        {replyingToId === comment._id && (
          <div className="ml-8">
            <AddComments
              issueId={comment.issueId}
              onCommentAdded={() => onReply(null)}
              parentId={comment._id}
            />
            <button
              onClick={() => onReply(null)}
              className="sub-text text-white bg-gray-500 rounded-xl py-1 px-2 mt-2"
            >
              Cancel
            </button>
          </div>
        )}
        {/* Render replies recursively */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-8">{renderComments(comment.replies)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex justify-center">
      <div className={`lg:w-7/12 px-3 ${neuecomic.className}`}>
        <h2 className="mb-4 h2-heading pb-5">Comments</h2>
        {comments.length === 0 ? (
          <p className="sub-text">No comments yet</p>
        ) : (
          <div className="space-y-4">{renderComments(nestedComments)}</div>
        )}
      </div>
    </div>
  );
}
