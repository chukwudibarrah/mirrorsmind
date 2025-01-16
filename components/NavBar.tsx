// components/NavBar.tsx

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { heroin } from "@/styles/fonts";

async function getFirstIssue() {
  const query = `*[_type == "comic"] | order(releaseDate desc)[0] {
    _id,
    title,
    slug,
    releaseDate,
    coverImage,
    description,
    author->
  }`;

  const issue = await client.fetch(query);
  return issue;
}

export default async function NavBar() {
  const post = await getFirstIssue();

  return (
    <header className="bg-black">
      <nav>
        <div className="flex justify-between items-baseline px-5 md:px-24">
          <div>
            <Link href="/">
              <Image
                src="/mirrorsmind-logo.webp"
                alt="Logo"
                width={130}
                height={100}
              />
            </Link>
          </div>
          <div
            className={`flex space-x-8 md:space-x-24 py-16 menu-text ${heroin.className}`}
          >
            <Link href={`/comic/${post?.slug?.current}`} className="menu-text">Comic</Link>
            <Link href="/about" className="menu-text">About</Link>
            <Link href="/contact" className="menu-text">Contact</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
