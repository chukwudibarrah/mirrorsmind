import { hadwick, heroin } from "@/styles/fonts";
import Link from "next/link";

export default function About() {
  return (
    <main>
      <section className="main-container">
        <div className="space-y-16">
          <h1 className={`text-[7rem] leading-none md:text-[11rem] ${hadwick.className}`}>About</h1>
          <div className="space-y-5">
            <p className={`para-text ${heroin.className}`}>
              Mirrors Mind explores a world torn apart by technology, fake news,
              and the hidden forces that sparked World War III. As the AI&apos;s
              sinister plan unfolds, humanity&apos;s future hangs in the balance.
            </p>
            <p className={`para-text ${heroin.className}`}>
              I&apos;ll be releasing one page every week, so get ready to immerse
              yourself in this intense and thought-provoking journey. If you
              want to stay updated and support my work, join my mailing list,
              and I&apos;ll keep you posted on new releases and progress!
            </p>
          </div>
          <button className="bg-red-500 hover:bg-white border-red-500 border-[1px] hover:shadow-2xl rounded-xl px-2">
            <Link
              href="/subscribe"
              aria-label="Navigate to subscribe"
              className={`button-text text-white ${heroin.className}`}
            >
              {" "}
              Join mailing list
            </Link>
          </button>
        </div>
      </section>
    </main>
  );
}
