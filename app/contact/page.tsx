import { hadwick, heroin } from "@/styles/fonts";

export default function Contact() {
  return (
    <main>
      <section className="main-container">
        <div>
          <h1
            className={`text-[7rem] leading-none md:text-[11rem] ${hadwick.className}`}
          >
            Contact
          </h1>
          <div>
            <p className={`para-text ${heroin.className}`}>Contact details</p>
          </div>
        </div>
      </section>
    </main>
  );
}
