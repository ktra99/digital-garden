import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import Avatar from "@public/avatar.png";
import { tagAtom, widthAtom, xAtom } from "@src/atoms";
import Header from "@src/components/header";
import { Desktop, Mobile } from "@src/components/nav";
import Navbar from "@src/components/navbar";
import Projects from "@src/components/projects";
import Stats from "@src/components/stats";
import { pageVariants, variants } from "@src/data";
import useLocale from "@src/hooks/useLocale";
import { getAllPosts } from "@src/pages/api";
import { PostMeta } from "@src/types";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useAtom } from "jotai";
import MouseFollower from "mouse-follower";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

MouseFollower.registerGSAP(gsap);

function ViewMore() {
  const translate = useLocale();
  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="relative h-full min-h-[9rem] rounded-md bg-white/5 p-6 ring-1 ring-white/10">
        <div className="flex h-full max-w-[30rem] items-center justify-center">
          <h2 className="text-xs font-bold text-white/80 xs:text-base sm:text-xl">
            {translate("View more")}
          </h2>
          <button
            type="button"
            aria-label="view more"
            className="absolute inset-0 z-20 flex items-center justify-center rounded-md border-2 border-transparent text-xl font-semibold transition-all duration-300 hover:border-white"
          ></button>
        </div>
      </div>
    </motion.div>
  );
}

function Post({ post }: { post: PostMeta }) {
  const { locale } = useRouter();
  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="relative h-full rounded-md bg-white/5 p-6 ring-1 ring-white/10">
        <div className="max-w-[30rem]">
          <h2 className="text-xs font-bold text-white/80 xs:text-base sm:text-xl">
            {post.title}
          </h2>
          <Link
            locale={locale}
            href={"/" + locale + "/posts/" + post.slug}
            aria-label={post.title}
            className="absolute inset-0 z-20 flex items-center justify-center rounded-md border-2 border-transparent text-xl font-semibold transition-all duration-300 hover:border-white"
          ></Link>
        </div>
      </div>
    </motion.div>
  );
}

function Tag({ post, className }: { post: PostMeta; className: string }) {
  const [tags, setTags] = useAtom(tagAtom);
  return (
    <>
      {
        <button
          type="button"
          onClick={() =>
            tags.includes(post.tag)
              ? setTags([...tags].filter((tag) => tag !== post.tag))
              : setTags([...tags, post.tag])
          }
          className={clsx(
            tags.includes(post.tag) ? "bg-white/40" : "bg-white/5",
            className
          )}
        >
          {post.tag}
        </button>
      }
    </>
  );
}

function Newsletter() {
  const translate = useLocale();
  return (
    <div className="relative isolate my-36 mx-auto overflow-hidden px-4">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 xl:max-w-none xl:grid-cols-2">
        <div className="max-w-xl xl:max-w-lg">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {translate("Subscribe to my newsletter.")}
          </h2>
          <p className="mt-4 text-lg leading-8 text-white">
            {translate("Don't miss out on exclusive content and updates!")}
          </p>
          <div className="mt-6 flex max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              {translate("Email address")}
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-md border border-white/10 bg-white/5 px-3.5 py-2 text-white placeholder-white shadow-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder={translate("Enter your email")}
            />
            <button
              type="submit"
              className="flex-none rounded-md border-2 border-transparent bg-white/5 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/10"
              disabled
            >
              {translate("Subscribe")}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
          <div className="flex flex-col items-start">
            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
              <CalendarDaysIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <h4 className="mt-4 font-semibold text-white">
              {translate("Weekly articles")}
            </h4>
            <p className="mt-2 leading-7 text-white">
              {translate("Stay informed and inspired every week!")}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
              <HandRaisedIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <h4 className="mt-4 font-semibold text-white">
              {translate("No spam")}
            </h4>
            <p className="mt-2 leading-7 text-white">
              {translate(
                "I'll never share your information or spam your inbox."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const translate = useLocale();
  return (
    <footer className="mx-auto my-4 px-4 sm:max-w-[33rem] sm:px-0 xl:max-w-7xl">
      <hr />
      <mark className="mt-4 mb-24 block bg-transparent font-semibold text-white xs:mb-32 xs:text-lg sm:mt-6">
        © {new Date().getFullYear() + " Kenny Tran."} {""}
        {translate("All rights reserved.")}
      </mark>
    </footer>
  );
}

export default function Home({ posts }: { posts: PostMeta[] }) {
  const translate = useLocale();
  const { locale } = useRouter();
  const [tags] = useAtom(tagAtom);
  const [_x, setX] = useAtom(xAtom);
  const [width, setWidth] = useAtom(widthAtom);
  const [cursor, setCursor] = useState<MouseFollower | null>(null);
  const title = "Kenny Tran";
  const description = translate(
    "Hey, I'm Kenny. I'm a developer based in Sweden. My strength lies in developing user friendly applications, with complex data and API integrations."
  );
  useEffect(() => {
    if (document.querySelectorAll(".mf-cursor").length) return;
    setCursor(new MouseFollower());
    return () => {
      document.querySelector(".mf-cursor")?.remove();
    };
  }, []);
  useEffect(() => {
    if (width === 0) {
      setX(locale === "en" ? 0 : 0.05);
      setWidth(locale === "en" ? 4 : 3.5);
    }
  }, [width, locale, setX, setWidth]);
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
        <div className="mx-auto flex max-w-7xl flex-col justify-between px-4 sm:mt-12 sm:items-center xl:flex-row xl:items-start">
          <div className="xl:order-0 order-1 mt-12 flex flex-col sm:mt-0 sm:w-[33rem] xl:w-[36rem]">
            <div className="block sm:mt-12 sm:hidden xl:block">
              <Header />
              <Desktop />
            </div>
            <div className="order-2 mt-0 mb-4 grid grid-cols-2 gap-4 xl:mb-10 xl:mt-12">
              <AnimatePresence>
                {tags.length > 0 ? (
                  <>
                    {posts
                      .filter(
                        (post: PostMeta) =>
                          post.locale === locale && tags.includes(post.tag)
                      )
                      .map((post: PostMeta) => (
                        <Post post={post} key={post.slug} />
                      ))}
                    <ViewMore />
                  </>
                ) : (
                  <>
                    {posts
                      .filter((post: PostMeta) => post.locale === locale)
                      .map((post: PostMeta) => (
                        <Post post={post} key={post.slug} />
                      ))}
                    <ViewMore />
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="my-6 sm:mb-12 sm:hidden">
              <div className="flex flex-wrap items-center text-xs xs:text-sm sm:space-x-2">
                {posts
                  .filter((post: PostMeta) => post.locale === locale)
                  .map((post: PostMeta) => (
                    <Tag
                      key={post.slug}
                      post={post}
                      className="my-1 mr-2 rounded-md border-2 border-transparent px-3 pt-2 pb-1 font-bold text-white transition-all duration-300 hover:border-white sm:mx-0 sm:my-3"
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="order-0 flex flex-col xl:order-1">
            <div className="relative mx-auto hidden h-96 w-96 rounded-full bg-white/5 ring-1 ring-white/10 sm:block xl:ml-auto">
              <Image
                src={Avatar}
                alt="avatar"
                placeholder="blur"
                priority
                fill
              />
            </div>
            <div className="hidden sm:mt-12 sm:block xl:hidden">
              <Header />
              <Desktop />
            </div>
            <div className="hidden sm:block">
              <div className="my-12 flex max-w-lg flex-wrap items-center justify-end space-x-6 text-lg xl:mt-24">
                {posts
                  .filter((post: PostMeta) => post.locale === locale)
                  .map((post: PostMeta) => (
                    <Tag
                      key={post.slug}
                      post={post}
                      className="my-3 rounded-full border-2 border-transparent px-6 pt-3 pb-2 font-bold text-white transition-all duration-300 hover:border-white"
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto sm:max-w-[35rem] xl:max-w-7xl">
          <Stats posts={posts} />
          <Projects cursor={cursor} />
          <Newsletter />
        </div>
      </motion.main>
      <Footer />
      <Mobile />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts().map((post) => post.meta);
  return {
    props: { posts },
  };
};
