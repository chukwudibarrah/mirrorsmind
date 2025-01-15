// components/NavBar.tsx

import Image from "next/image";
import Link from "next/link";
import { neuecomic } from "@/styles/fonts";

export default function NavBar() {
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
            className={`flex space-x-8 md:space-x-24 text-gray-200 text-[17px] md:text-xl font-thin uppercase py-16 ${neuecomic.className}`}
          >
            <Link href="/comic">Comic</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
