import K from "@public/k.png";
import Checkbox from "@src/components/checkbox";
import Code from "@src/components/code";
import Comments from "@src/components/comments";
import { getPostFromSlug, getSlugs } from "@src/pages/api";
import { MDXPost } from "@src/types";
import clsx from "clsx";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import remarkGFM from "remark-gfm";
import useLocale from "@src/hooks/useLocale";
import Avatar from "@public/avatar.png";

function Language({ url, language }: { url: string; language: string }) {
  const { push, locale } = useRouter();
  return (
    <button
      type="button"
      onClick={() =>
        push(url, url, {
          locale: language,
          scroll: false,
        })
      }
      className={clsx(
        locale === language ? "text-[#FAB0EB]" : "text-white",
        "uppercase"
      )}
      disabled={locale === language}
    >
      {language}
    </button>
  );
}

function Locale() {
  const { query } = useRouter();
  const en = query.slug
    ? "/posts/" + String(query.slug).split(".sv")[0] + ".en"
    : "/";
  const sv = query.slug
    ? "/posts/" + String(query.slug).split(".en")[0] + ".sv"
    : "/";
  return (
    <>
      <div className="text-lg font-bold text-[#FAB0EB]">
        <Language url={en} language="en" /> |{" "}
        <Language url={sv} language="sv" />
      </div>
    </>
  );
}

function Navbar() {
  return (
    <nav className="sticky top-0 z-30 bg-[#5A64DE] bg-opacity-75 py-3 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between px-4">
        <Link href="/" scroll={false} className="relative h-6 w-6">
          <Image src={K} alt="brand logotype" placeholder="blur" fill />
        </Link>
        <Locale />
      </div>
    </nav>
  );
}

function Footer() {
  const translate = useLocale();
  return (
    <footer className="mx-auto mb-4 max-w-3xl pl-4 font-semibold text-white xs:mt-4 xs:mb-16 xs:text-lg">
      © {new Date().getFullYear() + " Kenny Tran."} {""}
      {translate("All rights reserved.")}
    </footer>
  );
}

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
      <Navbar />
      <span
        className="fixed block h-1 bg-[#FAB0EB]"
        style={{ width: scrollPosition + "%" }}
      ></span>
      <main className="p-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center space-y-12">
          <span className="mt-12 rounded-full bg-[#3F49C2] px-8 pt-3 pb-2 font-bold text-white sm:mt-0">
            {post.meta.tag}
          </span>
          <h1 className="text-center text-[1.75rem] font-bold leading-[2.5rem] text-white sm:text-5xl sm:leading-[4rem]">
            {post.meta.title}
          </h1>
          <div className="flex items-center space-x-6">
            <div className="relative h-16 w-16">
              <Image src={Avatar} alt="avatar" placeholder="blur" fill />
            </div>
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
      <Footer />
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
