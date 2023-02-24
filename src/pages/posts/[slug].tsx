import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import Comment from "@src/components/comment";
import Navbar from "@src/components/navbar";
import useLocale from "@src/hooks/useLocale";
import { getAllPosts, getPostFromSlug } from "@src/pages/api";
import { MDXPost } from "@src/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import remarkGFM from "remark-gfm";
import { motion } from "framer-motion";
import { pageVariants } from "@src/data";
import { PostMeta } from "@src/types";

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
    <footer className="mx-auto mb-4 max-w-3xl px-4 font-semibold text-white xs:mt-4 xs:mb-16 xs:text-lg">
      <mark className="bg-transparent text-white">
        © {new Date().getFullYear() + " Kenny Tran."} {""}
        {translate("All rights reserved.")}
      </mark>
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position =
      (window.scrollY / (document.body.offsetHeight - window.innerHeight)) *
      100;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
      <span
        className="fixed block h-1 bg-white/80"
        style={{ width: scrollPosition + "%" }}
      ></span>
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
          <h1 className="my-6 text-[1.75rem] font-bold leading-[2.5rem] text-white xs:my-12 xs:text-5xl xs:leading-[4rem]">
            {post.meta.title}
          </h1>
          <div id="mdx" className="w-full space-y-6 font-sans text-white">
            <p>{post.meta.excerpt}</p>
            <MDXRemote {...post.source} components={{ Code, Checkbox }} />
            <hr />
          </div>
        </div>
      </motion.main>
      <Footer />
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
