import Checkbox from "@src/components/checkbox";
import Code from "@src/components/code";
import Comments from "@src/components/comments";
import { getPostFromSlug, getSlugs } from "@src/pages/api";
import { MDXPost } from "@src/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import remarkGFM from "remark-gfm";

export default function Post({ post }: { post: MDXPost }) {
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
      <Head>
        <title>{post.meta.title}</title>
        <meta name="description" content={post.meta.excerpt} />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="canonical" href={canonical} />
      </Head>
      <span
        className="fixed block h-1 bg-[#FAB0EB]"
        style={{ width: scrollPosition + "%" }}
      ></span>
      <main className="py-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center space-y-12 px-4">
          <span className="mt-12 rounded-full bg-[#3F49C2] px-8 pt-3 pb-2 font-bold text-white sm:mt-0">
            {post.meta.tag}
          </span>
          <h1 className="text-center text-[1.75rem] font-bold leading-[2.5rem] text-white sm:text-5xl sm:leading-[4rem]">
            {post.meta.title}
          </h1>
          <div className="flex items-center space-x-6">
            <img className="w-16" src="../../avatar.png" alt="avatar" />
            <div className="text-white">
              <h4 className="text-xl font-semibold">KENNY TRAN</h4>
              <p className="-mt-1 text-sm font-medium">{post.meta.time}</p>
            </div>
          </div>
          <div
            id="mdx"
            className="w-full space-y-6 font-sans text-white xs:space-y-12 xs:text-xl xs:leading-[2.75rem]"
          >
            <p>{post.meta.excerpt}</p>
            <MDXRemote {...post.source} components={{ Code, Checkbox }} />
            <hr />
          </div>
        </div>
      </main>
      <footer className="mx-auto mb-4 max-w-3xl pl-4 font-semibold text-white xs:mt-4 xs:mb-16 xs:text-lg">
        © {new Date().getFullYear() + " Kenny Tran."} {""}
        {locale === "en"
          ? "All rights reserved."
          : "Alla rättigheter förbehålles."}
      </footer>
      <Comments key={String(query.slug)} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: {
    params: {
      slug: string;
    };
    locale: string;
  }[] = [];
  getSlugs().forEach((slug) => {
    locales?.forEach((locale) => {
      if (slug.includes("." + locale)) {
        paths.push({
          params: {
            slug,
          },
          locale,
        });
      }
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
  return {
    props: {
      post: {
        source: mdxSource,
        meta,
      },
    },
  };
};
