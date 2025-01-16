import Link from "next/link";
import { heroin } from "@/styles/fonts";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="flex flex-col items-center space-y-10">
        <div className="flex space-x-10">
          <Link href="https://www.instagram.com/@username">
            <span>
              <Facebook />
            </span>
          </Link>
          <Link href="https://www.instagram.com/@username">
            <span>
              <Twitter />
            </span>
          </Link>
          <Link href="https://www.instagram.com/@username">
            <span>
              <Linkedin />
            </span>
          </Link>
          <Link href="https://www.instagram.com/@username">
            <span>
              <Youtube />
            </span>
          </Link>
          <Link href="https://www.instagram.com/@username">
            <span>
              <Instagram />
            </span>
          </Link>
        </div>
        <div>
          <p className={`text-center footer-text no-underline ${heroin.className}`}>
            &copy; {new Date().getFullYear()} Designed and developed by{" "}
            <span>
              <Link href="https://blackgourd.com" className="no-underline font-black">
                Black Gourd Creative Collective
              </Link>
            </span>{" "}
            . We reserve all the rights.
          </p>
        </div>
      </div>
    </footer>
  );
}
