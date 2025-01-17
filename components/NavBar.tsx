// components/NavBar.tsx

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import Navlinks from "./Navlinks";

async function getFirstIssue() {
  const query = `*[_type == "comic"] | order(releaseDate desc)[0] {
    slug
  }`;

  const issue = await client.fetch(query);
  return issue;
}

export default async function NavBar() {
  const post = await getFirstIssue();

  const navLinks = [
    { href: `/comic/${post?.slug?.current}`, label: "Comic" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

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
          <Navlinks navLinks={navLinks} />
        </div>
      </nav>
    </header>
  );
}
