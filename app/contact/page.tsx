import { hadwick, heroin } from "@/styles/fonts";
import Link from "next/link";

export default function Contact() {
  return (
    <main>
      <section className="main-container">
        <div className="space-y-10">
          <h1
            className={`text-[7rem] leading-none md:text-[11rem] ${hadwick.className}`}
          >
            Contact
          </h1>
          <div className="md:w-[50%]">
            <p className={`para-text ${heroin.className}`}>Add contact details</p>
            <p className={`para-text ${heroin.className}`}>
              Stay updated and support my work by joining my mailing list and
              I&apos;ll keep you posted on new releases and progress!
            </p>
          </div>
          <button className="bg-red-500 hover:bg-white border-red-500 border-[1px] hover:shadow-2xl rounded-xl px-2">
            <Link
              href="/subscribe"
              aria-label="Navigate to subscribe"
              className={`button-text text-white ${heroin.className}`}
            >
              {" "}
              Get updates
            </Link>
          </button>
        </div>
      </section>
    </main>
  );
}
