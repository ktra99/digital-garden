import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/20/solid";
import Comment from "@src/components/comment";
import Navbar from "@src/components/navbar";
import { pageVariants } from "@src/pages";
import useLocale from "@src/hooks/useLocale";
import useScroll from "@src/hooks/useScroll";
import { getAllPosts, getPostFromSlug } from "@src/pages/api";
import { MDXPost, PostMeta } from "@src/types";
import { AnimatePresence, motion } from "framer-motion";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import GitHubButton from "react-github-btn";
import rehypeHighlight from "rehype-highlight";
import remarkGFM from "remark-gfm";
import { Transition, Variants } from "framer-motion";

export const fadeTransition: Transition = {
  duration: 0.25,
  ease: "easeOut",
};

export const fadeVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: fadeTransition,
  },
  exit: {
    opacity: 0,
    transition: fadeTransition,
  },
};

function Nav({ post, posts }: { post: MDXPost; posts: PostMeta[] }) {
  const { locale } = useRouter();
  const [scrollPosition] = useScroll();
  const nextPost = posts.filter((item) => item.locale === locale)[
    posts
      .filter((item) => item.locale === locale)
      .findIndex((item) => item.slug === post.meta.slug) + 1
  ];
  return (
    <AnimatePresence>
      {scrollPosition > 3 && scrollPosition < 93 && (
        <motion.div
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed bottom-0 mx-auto flex w-full items-center justify-center space-x-4 bg-zinc-900/90 py-6 backdrop-blur-sm"
        >
          <Link
            href="/"
            aria-label="back"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#242427] transition duration-300 hover:border-white"
          >
            <ArrowLongLeftIcon className="h-6 w-6 text-white/40 transition duration-300 group-hover:text-white" />
          </Link>
          <div className="flex w-32 items-center justify-between rounded-full bg-[#242427] py-2 px-4 xs:w-48">
            <AnimatePresence mode="wait">
              {scrollPosition >= 75 && nextPost?.slug ? (
                <motion.p
                  key={1}
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-16 truncate py-1 text-xs text-white xs:w-32"
                >
                  {nextPost.title}
                </motion.p>
              ) : (
                <motion.div
                  key={2}
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex w-full items-center justify-between"
                >
                  <div className="w-14 xs:w-28">
                    <span
                      className="block h-1 rounded-full bg-white/80"
                      style={{ width: scrollPosition + "%" }}
                    ></span>
                  </div>
                  <span className="text-white">
                    {scrollPosition.toFixed(0)}%
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            {scrollPosition >= 75 && nextPost?.slug ? (
              <motion.div
                key={1}
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Link
                  href={"/" + locale + "/posts/" + nextPost.slug}
                  aria-label="next"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#242427] transition duration-300 hover:border-white"
                >
                  <ArrowLongRightIcon className="h-6 w-6 text-white/40 transition duration-300 group-hover:text-white" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={2}
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <button
                  type="button"
                  onClick={() => window.scrollTo(0, 0)}
                  aria-label="up"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#242427] transition duration-300 hover:border-white"
                >
                  <ArrowLongUpIcon className="h-6 w-6 text-white/40 transition duration-300 group-hover:text-white" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Code({ code }: { code: string }) {
  return (
    <code className="mx-2 rounded-md bg-white/20 px-1.5 py-1 text-base">
      {code}
    </code>
  );
}

function Checkbox({ header, excerpt }: { header: string; excerpt: string }) {
  return (
    <div className="relative flex items-start py-6">
      <div className="flex h-5 items-center">
        <input
          id="checkbox"
          aria-describedby="checkbox-description"
          name="checkbox"
          type="checkbox"
          className="h-6 w-6 rounded border-white/20 text-white/10 transition duration-300 focus:ring-white/10"
        />
      </div>
      <div className="ml-3 -mt-3">
        <label htmlFor="checkbox" className="font-medium text-white">
          {header}
        </label>
        <p id="checkbox-description" className="text-white/50">
          {excerpt}
        </p>
      </div>
    </div>
  );
}

function Footer() {
  const translate = useLocale();
  return (
    <footer className="mx-auto mb-4 max-w-3xl px-4 xs:mt-2.5 xs:mb-16">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <div className="mb-2.5 xs:mb-4 sm:mb-0">
          <mark className="bg-transparent font-semibold text-white xs:text-lg">
            © {new Date().getFullYear() + " Kenny Tran."} {""}
            {translate("All rights reserved.")}
          </mark>
        </div>
        <GitHubButton
          href="https://github.com/ktra99/digital-garden"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star ktra99/digital-garden on GitHub"
        >
          Star
        </GitHubButton>
      </div>
    </footer>
  );
}

export default function Post({
  post,
  posts,
}: {
  post: MDXPost;
  posts: PostMeta[];
}) {
  const { asPath, query, locale } = useRouter();
  const canonical = `https://ktra99.dev` + asPath;
  return (
    <>
      <NextSeo
        title={post.meta.title}
        description={post.meta.excerpt}
        canonical={canonical}
        openGraph={{
          title: post.meta.title,
          description: post.meta.excerpt,
          images: [
            {
              url: "https://www.ktra99.dev/og.png",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
          ],
          locale: locale,
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
      <Navbar posts={posts} />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="mx-auto flex max-w-3xl flex-col justify-center p-4">
          <Link
            href="/"
            aria-label="back"
            className="group mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition duration-300 hover:border-white"
          >
            <ArrowLongLeftIcon className="h-6 w-6 text-white/40 transition duration-300 group-hover:text-white" />
          </Link>
          <h1 className="my-6 text-[1.75rem] font-bold leading-[2.5rem] text-white xs:text-5xl xs:leading-[4rem] sm:my-12">
            {post.meta.title}
          </h1>
          <div id="mdx" className="w-full space-y-6 font-sans text-white">
            <MDXRemote
              {...post.source}
              components={{ Code, Image, Checkbox }}
            />
            <hr />
          </div>
        </div>
      </motion.main>
      <Footer />
      <Nav post={post} posts={posts} />
      <Comment key={query.slug as string} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: {
    params: {
      slug: string;
    };
    locale: string;
  }[] = [];
  getAllPosts().forEach((post) => {
    paths.push({
      params: {
        slug: post.meta.slug,
      },
      locale: post.meta.locale,
    });
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const { content, meta } = getPostFromSlug(slug);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGFM],
      rehypePlugins: [rehypeHighlight],
    },
  });
  const posts = getAllPosts().map((post) => post.meta);
  return {
    props: {
      post: {
        source: mdxSource,
        meta,
      },
      posts,
    },
  };
};
