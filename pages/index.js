import Layout from "../components/Layout";

import Image from "next/image";
import Link from "next/link";

import fs from "fs/promises";

export default function Home({ latestComics }) {
  return (
    <Layout>
      <main>
        <h1 className="block text-center font-bold text-[32px] pb-10">
          Latest Comics
        </h1>

        <section className="grid sm:grid-cols-2 gap-4 max-w-[1000px] mx-auto">
          {latestComics.map((comic) => {
            return (
              <article key={comic.id}>
                <Link href={`/comic/${comic.id}`}>
                  <a>
                    <h3 className="text-center text-[16px] font-bold">
                      {comic.title}
                    </h3>

                    <Image
                      src={comic.img}
                      alt={comic.alt}
                      layout="responsive"
                      width={500}
                      height={500}
                      objectFit="contain"
                    />
                  </a>
                </Link>
              </article>
            );
          })}
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir("./data/comics");
  const lastestComicsFiles = files.slice(-8, files.length);

  const promiseReadFiles = lastestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./data/comics/${file}`, "utf-8");

    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promiseReadFiles);

  return {
    props: { latestComics },
  };
}
