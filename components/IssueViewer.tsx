// components/IssueViewer.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import {
  ChevronRight,
  ChevronLast,
  ChevronLeft,
  MessageCircleMore,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { useViews } from "@/hooks/useViews";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface IssueViewerProps {
  issueId: string;
  coverImageUrl: string;
  title?: string;
  initialViews?: number;
  pages: any[];
  commentsCount?: number; // Updated prop
}

const IssueViewer: React.FC<IssueViewerProps> = ({
  issueId,
  coverImageUrl,
  title,
  initialViews = 0,
  commentsCount = 0,
  pages,
}) => {
  const { views, isLoading, error } = useViews(issueId, initialViews);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalPages = pages.length + 1;

  const getCurrentImage = () => {
    if (currentPageIndex === 0) {
      return {
        src: coverImageUrl,
        alt: title || "Issue Cover",
        key: "cover",
      };
    } else {
      const page = pages[currentPageIndex - 1];
      return {
        src: page.pageImage
          ? urlFor(page.pageImage).width(1000).height(1500).url()
          : "https://placehold.co/1000x1500",
        alt: title || `Page ${currentPageIndex}`,
        key: page._id,
      };
    }
  };

  const currentImage = getCurrentImage();

  const goToNextPage = useCallback(() => {
    if (currentPageIndex < totalPages - 1) {
      setDirection(1);
      setCurrentPageIndex((prev) => prev + 1);
    }
  }, [currentPageIndex, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (currentPageIndex > 0) {
      setDirection(-1);
      setCurrentPageIndex((prev) => prev - 1);
    }
  }, [currentPageIndex]);

  const goToLastPage = useCallback(() => {
    if (currentPageIndex !== totalPages - 1) {
      setDirection(1);
      setCurrentPageIndex(totalPages - 1);
    }
  }, [currentPageIndex, totalPages]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToNextPage();
      } else if (event.key === "ArrowLeft") {
        goToPreviousPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextPage, goToPreviousPage]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goToNextPage(),
    onSwipedRight: () => goToPreviousPage(),
    trackMouse: true,
  });

  const renderViewCount = () => {
    if (error) {
      console.error('View count error:', error);
      return `${initialViews} Views`;
    }
    if (isLoading) {
      return <span className="animate-pulse">Loading...</span>;
    }
    return `${views} Views`;
  };

  return (
    <section
      className="px-5 md:px-24 pt-10 pb-56 space-y-5"
      {...swipeHandlers}
    >
      <div className="flex justify-center ">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImage.key}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              className="rounded-xl cursor-pointer"
              onClick={goToNextPage}
              width={1000}
              height={1500}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="space-y-5">
        <div className="flex gap-2 justify-center">
          <button
            className="p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={goToPreviousPage}
            disabled={currentPageIndex === 0}
            aria-label="Previous Page"
          >
            <ChevronLeft size={70} strokeWidth={3} />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={goToNextPage}
            disabled={currentPageIndex >= totalPages - 1}
            aria-label="Next Page"
          >
            <ChevronRight size={70} strokeWidth={3} />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={goToLastPage}
            disabled={currentPageIndex === totalPages - 1}
            aria-label="Last Page"
          >
            <ChevronLast size={70} strokeWidth={3} />
          </button>
        </div>
        <div className="flex gap-4 justify-center">
          <div className="flex items-center gap-2">
            <MessageCircleMore size={24} strokeWidth={1} />
            <span>{commentsCount} Comment{commentsCount !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={24} strokeWidth={1} />
            <span>{renderViewCount()}</span>
          </div>
        </div>
        <div className="text-center">
          <span>
            Page {currentPageIndex === 0 ? "Cover" : currentPageIndex} of{" "}
            {totalPages - 1}
          </span>
        </div>
      </div>
    </section>
  );
};

export default IssueViewer;
