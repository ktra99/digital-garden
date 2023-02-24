import { ArrowLongLeftIcon, MoonIcon } from "@heroicons/react/20/solid";
import useLocale from "@src/hooks/useLocale";
import { getPostFromSlug, getSlugs } from "@src/pages/api";
import { MDXPost } from "@src/types";
import clsx from "clsx";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import remarkGFM from "remark-gfm";

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
          className="h-6 w-6 rounded border-gray-300 text-[#3F49C2] transition duration-300 focus:ring-[#3F49C2]"
        />
      </div>
      <div className="ml-3 -mt-3">
        <label htmlFor="checkbox" className="font-medium text-white">
          {header}
        </label>
        <p id="checkbox-description" className="text-[#FAB0EB]">
          {excerpt}
        </p>
      </div>
    </div>
  );
}

function Comments() {
  const { query } = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current?.children.length) return;
    const scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.crossOrigin = "anonymous";
    scriptElement.src = "https://utteranc.es/client.js";
    scriptElement.setAttribute("issue-term", "pathname");
    scriptElement.setAttribute("repo", "ktra99/digital-garden");
    scriptElement.setAttribute("theme", "github-dark");
    ref.current?.appendChild(scriptElement);
  }, [query]);
  return <div ref={ref} />;
}

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
        locale === language ? "text-white/80" : "text-white/40",
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
      <div className="text-lg font-bold text-white/40">
        <Language url={en} language="en" /> |{" "}
        <Language url={sv} language="sv" />
      </div>
    </>
  );
}

function Navbar() {
  return (
    <nav className="sticky top-0 z-30 bg-zinc-900 bg-opacity-75 py-3 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between px-4">
        <button type="button">
          <MoonIcon className="h-6 w-6 text-white/80" />
        </button>
        <Locale />
      </div>
    </nav>
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
      <Navbar />
      <span
        className="fixed block h-1 bg-white/80"
        style={{ width: scrollPosition + "%" }}
      ></span>
      <main>
        <div className="mx-auto flex max-w-3xl flex-col justify-center p-4">
          <Link
            href="/"
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
