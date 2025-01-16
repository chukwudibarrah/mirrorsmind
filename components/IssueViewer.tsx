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
import { heroin } from "@/styles/fonts";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import { useViews } from "@/hooks/useViews";
import { SanityPage } from '@/types/sanity';

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface ComicPage {
  _id: string;
  _type: string;
  pageImage: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  caption?: string;
  alt?: string;
}

type Page = SanityPage | ComicPage;

interface IssueViewerProps {
  issueId: string;
  coverImageUrl: string;
  title?: string;
  initialViews?: number;
  pages: Page[];
  commentsCount?: number;
}

function isSanityPage(page: Page): page is SanityPage {
  return 'asset' in page;
}

function isComicPage(page: Page): page is ComicPage {
  return 'pageImage' in page;
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

      let src = "https://via.placeholder.com/1000x1500.jpg"; // Updated placeholder
      const alt = page.alt || title || `Page ${currentPageIndex}`;
      let key = `page-${currentPageIndex}`;

      if (isSanityPage(page)) {
        src = page.asset
          ? urlFor(page.asset).width(1000).height(1500).url()
          : src;
        key = page._key || key;
      } else if (isComicPage(page)) {
        src = page.pageImage && page.pageImage.asset
          ? urlFor(page.pageImage).width(1000).height(1500).url()
          : src;
        key = page._id || key;
      }

      return {
        src,
        alt,
        key,
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
      return `${initialViews}`;
    }
    if (isLoading) {
      return <span className="animate-pulse">Loading...</span>;
    }
    return `${views}`;
  };

  return (
    <section
      className="px-5 md:px-24 pt-10 pb-24 space-y-5"
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
          <div className={`flex items-center gap-2 para-text ${heroin.className}`}>
            <MessageCircleMore size={24} strokeWidth={1} />
            <span className="">{commentsCount}</span>
          </div>
          <div className={`flex items-center gap-2 para-text ${heroin.className}`}>
            <Eye size={24} strokeWidth={1} />
            <span>{renderViewCount()}</span>
          </div>
        </div>
        <div className={`text-center para-text ${heroin.className}`}>
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
