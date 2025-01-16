// components/CommentsSection.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import AddComments from "./AddComments";
import ViewComments from "./ViewComments";

interface Comment {
  _id: string;
  text: string;
  name: string;
  createdAt: string;
  issueId: string;
  parent?: { _id: string } | null;
}

interface CommentsSectionProps {
  issueId: string;
  onCommentsUpdated?: (count: number) => void;
}

export default function CommentsSection({
  issueId,
  onCommentsUpdated,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);

  // Memoize fetchComments with useCallback
  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/comments?issueId=${issueId}`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();

      // Ensure each comment includes issueId
      const commentsWithIssueId = data.map((comment: Comment) => ({
        ...comment,
        issueId,
      }));
      setComments(commentsWithIssueId);

      if (onCommentsUpdated) {
        onCommentsUpdated(data.length);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [issueId, onCommentsUpdated]);

  // Include fetchComments in the dependency array
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentAdded = () => {
    fetchComments();
    setReplyingToId(null); // Reset replying state
  };

  const handleReply = (parentId: string | null) => {
    setReplyingToId(parentId);
  };

  return (
    <div className="space-y-16">
      <ViewComments
        comments={comments}
        isLoading={isLoading}
        onReply={handleReply}
        replyingToId={replyingToId}
      />
      {/* Only show main AddComments form when not replying */}
      {replyingToId === null && (
        <AddComments issueId={issueId} onCommentAdded={handleCommentAdded} />
      )}
    </div>
  );
}
