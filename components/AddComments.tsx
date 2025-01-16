// components/AddComments.tsx

"use client";

import { useState, useEffect } from "react";
import { heroin } from "@/styles/fonts";

interface AddCommentsProps {
  issueId: string;
  onCommentAdded: () => void;
  parentId?: string;
}

export default function AddComments({
  issueId,
  onCommentAdded,
  parentId,
}: AddCommentsProps) {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved name and email from localStorage on component mount
  useEffect(() => {
    const savedName = localStorage.getItem("commenterName");
    const savedEmail = localStorage.getItem("commenterEmail");
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !comment) return;

    setIsSubmitting(true);

    if (saveInfo) {
      localStorage.setItem("commenterName", name);
      localStorage.setItem("commenterEmail", email);
    } else {
      localStorage.removeItem("commenterName");
      localStorage.removeItem("commenterEmail");
    }

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: comment,
          issueId,
          name,
          email,
          parentId, // Include parentId if it's a reply
        }),
      });

      if (!response.ok) throw new Error("Failed to submit comment");

      // Clear the comment field after successful submission
      setComment("");
      setName("");
      setEmail("");

      // Notify parent component to refresh comments
      onCommentAdded();
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center m-5">
      <form
        onSubmit={handleSubmit}
        className={`grid grid-cols-1 lg:w-7/12 border-gray-300 border-[1px] px-3 py-10 ${heroin.className}`}
      >
        <h2 className="mb-4 h2-heading">
          {parentId ? "Leave a reply" : "Leave a comment"}
        </h2>
        <p className="mb-4 sub-text">
          Your email address will not be published. Required fields are marked{" "}
          <span className="text-red-500">*</span>
        </p>

        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block sub-text"
          >
            Comment<span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={5}
            className="mt-1 block w-full rounded-md border-[1px] border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 body-text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block sub-text"
          >
            Name<span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 block w-full rounded-md border-[1px] border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 body-text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block sub-text"
          >
            Email<span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full rounded-md border-[1px] border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 body-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 sub-text">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
            />
            <span className="ml-2">
              Save my name and email in this browser for the next time I
              comment.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-300 disabled:bg-gray-400 ${heroin.className} uppercase md:text-xl font-thin w-[50%] md:w-[30%]`}
        >
          {isSubmitting ? "Submitting..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
}
