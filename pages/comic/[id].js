import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { readFile, stat } from "fs/promises";
import fs from "fs/promises";
import { basename } from "path";

export default function Comic({ comic, hasNext, hasPrevious, prevId, nextId }) {
  return (
    <>
      <Layout>
        <article className="max-w-[700px] mx-auto">
          <h2 className="text-center font-bold text-[28px] mb-4">
            {comic.title}
          </h2>
          <section>
            <div className="flex items-center justify-center">
              <img src={comic.img} alt={comic.alt} />
            </div>

            <p className="pt-3">{comic.alt}</p>
          </section>

          <div className="flex justify-between pt-5">
            {hasPrevious && (
              <Link href={`/comic/${prevId}`} className="text-gray-600">
                Previous
              </Link>
            )}
            {hasNext && (
              <Link href={`/comic/${nextId}`} className="text-gray-600">
                Next
              </Link>
            )}
          </div>
        </article>
      </Layout>

      <Head>
        <title>Xkdc - Comic for developers</title>
        <meta name="description" content="Comic for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}

// Static Side Generation (SSG)

export async function getStaticPaths() {
  const files = await fs.readdir("./data/comics");

  const paths = files.map((file) => {
    const id = basename(file, ".json");

    return { params: { id } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./data/comics/${id}.json`, "utf8");

  const comic = JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevFile, nextFile] = await Promise.allSettled([
    stat(`./data/comics/${prevId}.json`),
    stat(`./data/comics/${nextId}.json`),
  ]);

  const hasPrevious = prevFile.status === "fulfilled";
  const hasNext = nextFile.status === "fulfilled";

  return { props: { comic, hasPrevious, hasNext, nextId, prevId } };
}
