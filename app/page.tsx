import { client } from "@/sanity/lib/client";
import { hadwick, heroin } from "@/styles/fonts";
import Link from "next/link";

// Data fetching function
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

export default async function Home() {
  const post = await getFirstIssue();

  if (!post) {
    return (
      <main>
        <section className="h-screen w-screen">
          <div className="h-full w-full flex flex-col justify-center items-center space-y-10">
            <div>
              <h1
                className={`text-[7rem] leading-none md:text-[11rem] text-center ${hadwick.className}`}
              >
                Mirrors&apos; Mind
              </h1>
            </div>
            <div className="px-5 md:px-28">
            <p className={`para-text ${heroin.className}`}>
                The year is 2090 life is hard for the majority of people on the
                planet there was a world war in 2030 now over 60 years things
                are slowly begging to be peaceful again crime rates in the UK
                have increased like most of the other countries excluding a few.
                The global economic downturn led to widespread unemployment and
                poverty, which in turn led to increases in various types of
                crime, including theft, burglary, and violent crime.
              </p>
            </div>
            <div>
              <span
                className={`text-3xl md:text-4xl font-thin uppercase ${heroin.className}`}
              >
                Coming Soon
              </span>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="main-container">
        <div className="min-h-full w-full flex flex-col justify-center items-center space-y-10">
          <div>
            <h1
              className={`text-[7rem] leading-none md:text-[11rem] text-center ${hadwick.className}`}
            >
              Mirrors&apos; Mind
            </h1>
          </div>
          <div className="px-5 md:px-28">
            <p className={`para-text ${heroin.className}`}>
              The year is 2090 life is hard for the majority of people on the
              planet there was a world war in 2030 now over 60 years things are
              slowly begging to be peaceful again crime rates in the UK have
              increased like most of the other countries excluding a few. The
              global economic downturn led to widespread unemployment and
              poverty, which in turn led to increases in various types of crime,
              including theft, burglary, and violent crime.
            </p>
          </div>
          <button className="bg-red-500 p-2 rounded-xl border-[1px] text-white hover:text-red-500 hover:border-red-500 hover:border-[1px]  hover:bg-white hover:shadow-xl">
            <Link
              href={`/comic/${post?.slug?.current}`}
              className={`text-3xl md:text-4xl font-thin uppercase ${heroin.className}`}
            >
              Read comic
            </Link>
          </button>
        </div>
      </section>
    </main>
  );
}
