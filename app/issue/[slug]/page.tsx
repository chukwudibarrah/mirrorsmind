// app/issue/[slug]/page.tsx

import { client } from "@/sanity/lib/client";
import { ISSUES_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import ClientIssuePage from './ClientIssuePage';

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface Props {
  params: Promise<{ slug: string }>;
}

interface SanityIssue {
  _id: string;
  title?: string;
  coverImage?: SanityImageSource;
  views?: number;
  pages?: Array<{
    _key: string;
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
    caption?: string;
    alt?: string;
  }>;
}

export default async function IssuePage({ params }: Props) {
  const { slug } = await params;

  const issue = await client.fetch<SanityIssue>(ISSUES_BY_SLUG_QUERY, { slug });

  if (!issue) return notFound();

  const coverImageUrl = issue.coverImage
    ? urlFor(issue.coverImage).width(1000).height(1500).url()
    : "https://placehold.co/1000x1500";

  const commentsCount = await client.fetch<number>(
    `count(*[_type == "comment" && issue._ref == $issueId])`,
    { issueId: issue._id }
  );

  return (
    <ClientIssuePage
      issueId={issue._id}
      coverImageUrl={coverImageUrl}
      title={issue.title}
      initialViews={issue.views}
      initialCommentsCount={commentsCount}
      pages={issue.pages ?? []}
    />
  );
}
