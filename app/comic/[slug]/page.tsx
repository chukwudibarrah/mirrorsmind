// app/comic/[slug]/page.tsx

/* eslint-disable @next/next/no-img-element */
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import imageUrlBuilder from "@sanity/image-url";
import { ISSUES_QUERY } from "@/sanity/lib/queries";
import { heroin } from "@/styles/fonts";
import Link from "next/link";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface Props {
  params: Promise<{ slug: string }>;
}

interface ComicIssue {
  title: string;
  coverImage: SanityImageSource;
  releaseDate?: string;
  pages?: Array<unknown>;
  slug?: {
    current: string;
  };
}

interface QueryResult {
  issues: ComicIssue[];
}

export default async function ComicIssue({ params }: Props) {
  const { slug } = await params;
  
  const result = await client.fetch<QueryResult>(ISSUES_QUERY, { slug });

  if (!result || !result.issues || result.issues.length === 0) {
    return notFound();
  }

  const post = result.issues[0];
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(800).height(1200).url()
    : "https://placehold.co/800x1200";

  return (
    <main className="main-container">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="space-y-5">
          <div className="">
            <Link href={`/issue/${post?.slug?.current}`}>
              <img
                src={imageUrl}
                alt={post.title}
                className="rounded-xl shadow-lg"
              />
            </Link>
          </div>
          <div>
            <Link href={`/issue/${post?.slug?.current}`}>
              <span>
                <h1 className={`h1-heading ${heroin.className}`}>
                  {post.title}
                </h1>
              </span>
            </Link>
          </div>
          <div className="">
            {post.releaseDate && (
              <div
                className={`para-text ${heroin.className}`}
              >
                <span className="font-black">Release Date:</span> {new Date(post.releaseDate).toLocaleDateString()}
              </div>
            )}
            <div>
              {Array.isArray(post.pages) && post.pages.length > 0 && (
                <p
                  className={`para-text ${heroin.className}`}
                >
                  {post.pages.length} pages available
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
