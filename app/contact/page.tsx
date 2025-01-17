import { hadwick, heroin } from "@/styles/fonts";


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
        </div>
      </section>
    </main>
  );
}
