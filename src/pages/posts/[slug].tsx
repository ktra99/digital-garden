import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import Comment from "@src/components/comment";
import { Post as PostFooter } from "@src/components/footer";
import { Checkbox, Code } from "@src/components/mdx";
import Navbar from "@src/components/navbar";
import { pageVariants } from "@src/data";
import { getAllPosts, getPostFromSlug } from "@src/pages/api";
import { MDXPost, PostMeta } from "@src/types";
import { motion } from "framer-motion";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import rehypeHighlight from "rehype-highlight";
import remarkGFM from "remark-gfm";
import { Blog as BlogNav } from "@src/components/nav";

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
      <PostFooter />
      <BlogNav post={post} posts={posts} />
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
