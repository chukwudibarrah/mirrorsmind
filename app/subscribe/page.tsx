import SubscribeForm from "@/components/SubscribeForm";
import { hadwick, heroin } from "@/styles/fonts";

export default function Subscribe() {
  return (
    <main className="main-container">
      <section>
        <div className="space-y-10">
            <h1
              className={`text-[7rem] leading-none md:text-[11rem] ${hadwick.className}`}
            >
              Get the updates
            </h1>
            <p  className={`para-text ${heroin.className}`}>Subscribe to my newsletter to receive updates on my current and upcoming projects</p>
            <SubscribeForm />
        </div>
      </section>
    </main>
  );
}
