// components/ComicCard.tsx

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Image from "next/image";
import { Comic, Issue, Author } from "@/sanity/types";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

export type ComicTypeCard = Omit<Comic, "author"> & { author?: Author };

// Setup Sanity Image URL Builder
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default function ComicCard({ post }: { post: ComicTypeCard }) {
  const { title, coverImage, description, slug } = post;

  return (
    <>
      <div>
        <Link href={`/comic/${post?.slug?.current}`}>
          <img
            src={
              coverImage
                ? urlFor(coverImage).width(400).height(600).url()
                : "https://placehold.co/400x600"
            }
            alt={title}
            className="rounded-lg"
          />
        </Link>
        <Link href={`/comic/${post?.slug?.current}`}>
          <span className="h2-heading">{title}</span>
        </Link>
      </div>
    </>
  );
}
