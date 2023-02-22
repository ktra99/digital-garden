import {
  ArrowLongRightIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";
import { getAllPosts } from "@src/pages/api";
import { PostMeta } from "@src/types";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";

const tagAtom = atomWithStorage<string[]>("tags", []);

function Header() {
  return (
    <>
      <h2 className="text-center text-4xl font-bold text-white xs:text-6xl sm:text-left sm:text-8xl">
        KENNY TRAN
      </h2>
      <div className="my-3 mx-auto flex w-48 items-center space-x-4 xs:w-72 xs:space-x-6 sm:mx-0 sm:w-[30rem]">
        <hr className="w-12 border border-[#FAB0EB] xs:w-24 sm:w-64" />
        <a href="https://twitter.com/ktra99">
          <img className="w-8" src="/twitter.png" alt="twitter" />
        </a>
        <a href="https://dribbble.com/ktra99">
          <img className="w-8" src="/dribbble.png" alt="dribbble" />
        </a>
        <a href="https://github.com/ktra99">
          <img className="w-8" src="/github.png" alt="github" />
        </a>
        <a href="https://www.linkedin.com/in/ktra99/">
          <img className="w-8" src="/linkedin.png" alt="linkedin" />
        </a>
      </div>
    </>
  );
}

function Post({ post }: { post: PostMeta }) {
  const { locale } = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: "auto",
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
      exit={{
        opacity: 0,
        height: 0,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
    >
      <div className="py-3 sm:py-6">
        <div className="relative rounded-lg border-2 border-[#FAB0EB] bg-[#6973E9] p-4 transition duration-300 xs:p-6 sm:p-8">
          <div className="max-w-[30rem] space-y-6">
            <h2 className="text-2xl font-bold text-white">{post.title}</h2>
            <Link
              locale="en"
              href={"/" + locale + "/posts/" + post.slug}
              className="block text-xl font-semibold text-[#FAB0EB]"
            >
              <span className="group absolute inset-0 z-20 flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-black hover:bg-opacity-60 hover:backdrop-blur-sm">
                <ArrowTopRightOnSquareIcon className="h-10 w-10 opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </span>
              Read post <ArrowLongRightIcon className="inline h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Tag({ post, className }: { post: PostMeta; className: string }) {
  const [tags, setTags] = useAtom(tagAtom);
  return (
    <>
      {tags.includes(post.tag) ? (
        <button
          type="button"
          onClick={() => setTags([...tags].filter((tag) => tag !== post.tag))}
          className={clsx("bg-[#AF7DE2]", className)}
        >
          {post.tag}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setTags([...tags, post.tag])}
          className={clsx("bg-[#3F49C2]", className)}
        >
          {post.tag}
        </button>
      )}
    </>
  );
}

function Footer() {
  const { locale } = useRouter();
  return (
    <footer className="mx-auto my-4 px-4 sm:max-w-[36rem] sm:px-0 xl:max-w-7xl xl:px-4">
      <hr />
      <mark className="mt-4 mb-24 block bg-transparent font-semibold text-white xs:mb-32 xs:text-lg sm:mt-6">
        © {new Date().getFullYear() + " Kenny Tran."} {""}
        {locale === "en"
          ? "All rights reserved."
          : "Alla rättigheter förbehålles."}
      </mark>
    </footer>
  );
}

export default function Home({ posts }: { posts: PostMeta[] }) {
  const { locale } = useRouter();
  const [tags, setTags] = useAtom(tagAtom);
  const title = "Kenny Tran";
  const description =
    locale === "en"
      ? "Hey, I'm Kenny. I'm an aspiring developer looking to facilitate ideas through the web"
      : "Hej, Jag är Kenny. Jag är en utvecklare som vill arbeta med idéer via webben";
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical="https://www.ktra99.dev/"
        openGraph={{
          title,
          description,
          images: [
            {
              url: "https://www.ktra99.dev/og.png",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
          ],
          siteName: "ktra99.dev",
        }}
        twitter={{
          handle: "@ktra99",
          site: "@ktra99.dev",
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://www.ktra99.dev/favicon.ico",
          },
        ]}
      />
      <main>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between px-4 sm:items-center xl:flex-row xl:items-start">
          <div className="xl:order-0 order-1 mt-12 flex flex-col sm:mt-6 sm:w-[36rem] xl:mt-0">
            <div className="block sm:mt-12 sm:hidden xl:block">
              <Header />
            </div>
            <div className="order-2 mt-0 xl:mt-24">
              <AnimatePresence>
                {locale === "en"
                  ? tags.length > 0
                    ? posts
                        .filter(
                          (post: PostMeta) =>
                            post.slug.includes(".en") && tags.includes(post.tag)
                        )
                        .map((post: PostMeta) => (
                          <Post post={post} key={post.slug} />
                        ))
                    : posts
                        .filter((post: PostMeta) => post.slug.includes(".en"))
                        .map((post: PostMeta) => (
                          <Post post={post} key={post.slug} />
                        ))
                  : tags.length > 0
                  ? posts
                      .filter(
                        (post: PostMeta) =>
                          post.slug.includes(".sv") && tags.includes(post.tag)
                      )
                      .map((post: PostMeta) => (
                        <Post post={post} key={post.slug} />
                      ))
                  : posts
                      .filter((post: PostMeta) => post.slug.includes(".sv"))
                      .map((post: PostMeta) => (
                        <Post post={post} key={post.slug} />
                      ))}
              </AnimatePresence>
            </div>
            <div className="my-6 sm:mb-12 sm:hidden">
              <div className="flex flex-wrap items-center text-sm xs:text-base sm:space-x-2">
                {locale === "en"
                  ? posts
                      .filter((post: PostMeta) => post.slug.includes(".en"))
                      .map((post: PostMeta) => (
                        <Tag
                          key={post.slug}
                          post={post}
                          className="my-1 mr-2 rounded-md px-4 pt-2 pb-1 font-bold text-white transition duration-300 sm:mx-0 sm:my-3"
                        />
                      ))
                  : posts
                      .filter((post: PostMeta) => post.slug.includes(".sv"))
                      .map((post: PostMeta) => (
                        <Tag
                          key={post.slug}
                          post={post}
                          className="my-1 mr-2 rounded-md px-4 pt-2 pb-1 font-bold text-white transition duration-300 sm:mx-0 sm:my-3"
                        />
                      ))}
              </div>
            </div>
          </div>
          <div className="order-0 flex flex-col xl:order-1">
            <img
              className="mx-auto w-full max-w-[16rem] sm:max-w-[24rem] xl:ml-auto"
              src="/avatar.png"
              alt="avatar"
            />
            <div className="hidden sm:mt-12 sm:block xl:hidden">
              <Header />
            </div>
            <div className="hidden sm:block">
              <div className="mt-12 flex max-w-lg flex-wrap items-center justify-end space-x-6 text-lg xl:mt-24">
                {locale === "en"
                  ? posts
                      .filter((post: PostMeta) => post.slug.includes(".en"))
                      .map((post: PostMeta) => (
                        <Tag
                          key={post.slug}
                          post={post}
                          className="my-3 rounded-full px-8 pt-3 pb-2 font-bold text-white transition duration-300"
                        />
                      ))
                  : posts
                      .filter((post: PostMeta) => post.slug.includes(".sv"))
                      .map((post: PostMeta) => (
                        <Tag
                          key={post.slug}
                          post={post}
                          className="my-3 rounded-full px-8 pt-3 pb-2 font-bold text-white transition duration-300"
                        />
                      ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts().map((post) => post.meta);
  return {
    props: { posts },
  };
};
