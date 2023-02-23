import {
  ArrowsPointingOutIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";
import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import Avatar from "@public/avatar.png";
import K from "@public/k.png";
import { nav, navigation, projects } from "@src/data";
import useLocale from "@src/hooks/useLocale";
import { getAllPosts } from "@src/pages/api";
import { PostMeta } from "@src/types";
import clsx from "clsx";
import { AnimatePresence, motion, Transition, Variants } from "framer-motion";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const transition: Transition = {
  duration: 0.25,
  ease: "easeOut",
};

const variants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition,
  },
  exit: {
    opacity: 0,
    transition,
  },
};

const xAtom = atom(0);
const widthAtom = atom(0);
const tagAtom = atomWithStorage<string[]>("tags", []);

function Language({ url, language }: { url: string; language: string }) {
  const [_x, setX] = useAtom(xAtom);
  const { push, locale } = useRouter();
  const [_width, setWidth] = useAtom(widthAtom);
  const coordinates = nav[language as keyof {}] as {
    x: number;
    width: number;
  }[];
  return (
    <button
      type="button"
      onClick={() => {
        setX(coordinates[0].x);
        setWidth(coordinates[0].width);
        push(url, url, {
          locale: language,
          scroll: false,
        });
      }}
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

function Hover({ blog }: { blog: boolean }) {
  const icon =
    "h-6 w-6 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 xs:h-10 xs:w-10";
  return (
    <span className="group absolute inset-0 z-20 flex items-center justify-center rounded-lg text-xl font-semibold transition-all duration-300 hover:bg-black hover:bg-opacity-75 hover:backdrop-blur-sm">
      {blog ? (
        <ArrowTopRightOnSquareIcon className={icon} />
      ) : (
        <ArrowsPointingOutIcon className={icon} />
      )}
    </span>
  );
}

function ViewMore() {
  const translate = useLocale();
  return (
    <motion.div layout variants={variants}>
      <div className="relative h-full min-h-[10rem] rounded-lg border-2 border-[#FAB0EB] bg-[#6973E9] p-6">
        <div className="flex h-full max-w-[30rem] items-center justify-center">
          <h2 className="text-xs font-bold text-white xs:text-base sm:text-xl">
            {translate("View more")}
          </h2>
          <button type="button">
            <Hover blog={false} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DesktopNav() {
  const translate = useLocale();
  const { locale } = useRouter();
  const [x, setX] = useAtom(xAtom);
  const [width, setWidth] = useAtom(widthAtom);
  const coordinates = nav[locale as keyof {}] as { x: number; width: number }[];
  return (
    <nav className="-ml-9 flex w-full items-center justify-between md:mt-12 xl:mt-24">
      <div
        className="relative hidden space-x-12 text-lg font-semibold text-white md:block"
        onMouseLeave={() => {
          setX(coordinates[0].x);
          setWidth(coordinates[0].width);
        }}
      >
        <div
          className="absolute top-[-0.2rem] left-[2.1rem] h-8 rounded-lg bg-[#AF7DE2] transition-all duration-150"
          style={{ width: width + "rem", translate: x + "rem" }}
        ></div>
        {navigation.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="relative uppercase"
            onMouseEnter={() => {
              setX(coordinates[index].x);
              setWidth(coordinates[index].width);
            }}
          >
            {translate(item.name)}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function Header() {
  const translate = useLocale();
  return (
    <>
      <h2 className="text-4xl font-bold text-white xs:text-6xl sm:text-8xl">
        KENNY TRAN
      </h2>
      <div className="my-3 sm:w-[30rem]">
        <p className="text-lg leading-8 text-gray-300">
          {translate(
            "Hey, I'm Kenny. I'm a developer based in Sweden. My strength lies in developing user friendly applications, with complex data and API integrations."
          )}
        </p>
      </div>
    </>
  );
}

function Post({ post }: { post: PostMeta }) {
  const { locale } = useRouter();
  return (
    <motion.div layout variants={variants}>
      <div className="relative h-full rounded-lg border-2 border-[#FAB0EB] bg-[#6973E9] p-6">
        <div className="max-w-[30rem]">
          <h2 className="text-xs font-bold text-white xs:text-base sm:text-xl">
            {post.title}
          </h2>
          <Link
            locale={locale}
            href={"/" + locale + "/posts/" + post.slug}
            className="block text-xl font-semibold"
          >
            <Hover blog={true} />
          </Link>
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
            tags.includes(post.tag) ? "bg-[#AF7DE2]" : "bg-[#3F49C2]",
            className
          )}
        >
          {post.tag}
        </button>
      }
    </>
  );
}

function Projects() {
  const translate = useLocale();
  return (
    <div id="projects" className="mx-auto my-24 w-full px-4">
      <div className="divide-y divide-white">
        <h2 className="text-4xl font-bold leading-10 tracking-tight text-white">
          {translate("Projects")}
        </h2>
        <dl className="mt-10 space-y-6 divide-y divide-white">
          {projects.map((project) => (
            <dt key={project.href} className="pt-6">
              <div className="group relative flex w-full items-start justify-between text-left text-white">
                <span className="font-semibold leading-7 group-hover:text-[#FAB0EB] sm:text-xl">
                  {project.name}
                </span>
                <a
                  href={project.href}
                  className="absolute inset-0 z-20 flex h-7 items-center group-hover:text-[#FAB0EB]"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ArrowTopRightOnSquareIcon className="ml-auto h-6 w-6" />
                </a>
              </div>
            </dt>
          ))}
        </dl>
      </div>
    </div>
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
          <p className="mt-4 text-lg leading-8 text-gray-300">
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
              className="min-w-0 flex-auto rounded-md border-2 border-transparent bg-white/5 px-3.5 py-2 text-white placeholder-white shadow-sm outline-none ring-1 ring-inset ring-white/10 transition-all duration-300 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder={translate("Enter your email")}
            />
            <button
              type="submit"
              className="flex-none rounded-md border-2 border-transparent bg-[#3F49C2] py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F49C2]"
              disabled
            >
              {translate("Subscribe")}
            </button>
          </div>
        </div>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
          <div className="flex flex-col items-start">
            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
              <CalendarDaysIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <dt className="mt-4 font-semibold text-white">
              {translate("Weekly articles")}
            </dt>
            <dd className="mt-2 leading-7 text-gray-300">
              {translate("Stay informed and inspired every week!")}
            </dd>
          </div>
          <div className="flex flex-col items-start">
            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
              <HandRaisedIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <dt className="mt-4 font-semibold text-white">
              {translate("No spam")}
            </dt>
            <dd className="mt-2 leading-7 text-gray-300">
              {translate(
                "I'll never share your information or spam your inbox."
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Footer() {
  const translate = useLocale();
  return (
    <footer className="mx-auto my-4 px-4 sm:max-w-[33rem] sm:px-0 xl:max-w-7xl xl:px-4">
      <hr />
      <mark className="mt-4 mb-24 block bg-transparent font-semibold text-white xs:mb-32 xs:text-lg sm:mt-6">
        © {new Date().getFullYear() + " Kenny Tran."} {""}
        {translate("All rights reserved.")}
      </mark>
    </footer>
  );
}

function MobileNav() {
  const { route } = useRouter();
  return (
    <nav className="fixed bottom-5 z-20 flex w-full justify-center md:hidden">
      <div className="mx-auto flex w-full max-w-[15rem] items-center justify-between rounded-full bg-black bg-opacity-75 py-4 px-8 text-white backdrop-blur-sm xs:max-w-[20rem]">
        {navigation.map((item, index) => (
          <Link key={index} href={item.href} scroll={false}>
            <item.icon
              className={clsx(
                route === item.href ? "text-[#FAB0EB]" : "text-white",
                "h-7 w-7 xs:h-9 xs:w-9"
              )}
            />
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default function Home({ posts }: { posts: PostMeta[] }) {
  const translate = useLocale();
  const { locale } = useRouter();
  const [tags] = useAtom(tagAtom);
  const [_x, setX] = useAtom(xAtom);
  const [width, setWidth] = useAtom(widthAtom);
  const title = "Kenny Tran";
  const description = translate(
    "Hey, I'm Kenny. I'm a developer based in Sweden. My strength lies in developing user friendly applications, with complex data and API integrations."
  );
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
      <main>
        <div className="mx-auto flex max-w-7xl flex-col justify-between px-4 sm:mt-12 sm:items-center xl:flex-row xl:items-start">
          <div className="xl:order-0 order-1 mt-12 flex flex-col sm:mt-0 sm:w-[33rem] xl:w-[36rem]">
            <div className="block sm:mt-12 sm:hidden xl:block">
              <Header />
              <DesktopNav />
            </div>
            <div className="order-2 mt-0 mb-4 grid grid-cols-2 gap-4 xl:mb-10 xl:mt-12">
              <AnimatePresence>
                {locale === "en" ? (
                  tags.length > 0 ? (
                    <>
                      {posts
                        .filter(
                          (post: PostMeta) =>
                            post.slug.includes(".en") && tags.includes(post.tag)
                        )
                        .map((post: PostMeta) => (
                          <Post post={post} key={post.slug} />
                        ))}
                      <ViewMore />
                    </>
                  ) : (
                    <>
                      {posts
                        .filter((post: PostMeta) => post.slug.includes(".en"))
                        .map((post: PostMeta) => (
                          <Post post={post} key={post.slug} />
                        ))}
                      <ViewMore />
                    </>
                  )
                ) : tags.length > 0 ? (
                  <>
                    {posts
                      .filter(
                        (post: PostMeta) =>
                          post.slug.includes(".sv") && tags.includes(post.tag)
                      )
                      .map((post: PostMeta) => (
                        <Post post={post} key={post.slug} />
                      ))}
                    <ViewMore />
                  </>
                ) : (
                  <>
                    {posts
                      .filter((post: PostMeta) => post.slug.includes(".sv"))
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
                {locale === "en"
                  ? posts
                      .filter((post: PostMeta) => post.slug.includes(".en"))
                      .map((post: PostMeta) => (
                        <Tag
                          key={post.slug}
                          post={post}
                          className="my-1 mr-2 rounded-md border-2 border-transparent px-3 pt-2 pb-1 font-bold text-white transition-all duration-300 hover:border-white sm:mx-0 sm:my-3"
                        />
                      ))
                  : posts
                      .filter((post: PostMeta) => post.slug.includes(".sv"))
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
            <div className="relative mx-auto hidden h-64 w-full max-w-[16rem] sm:block sm:h-96 sm:max-w-[24rem] xl:ml-auto">
              <Image src={Avatar} alt="avatar" placeholder="blur" fill />
            </div>
            <div className="hidden sm:mt-12 sm:block xl:hidden">
              <Header />
              <DesktopNav />
            </div>
            <div className="hidden sm:block">
              <div className="my-12 flex max-w-lg flex-wrap items-center justify-end space-x-6 text-lg xl:mt-24">
                {locale === "en"
                  ? posts
                      .filter((post: PostMeta) => post.slug.includes(".en"))
                      .map((post: PostMeta) => (
                        <Tag
                          key={post.slug}
                          post={post}
                          className="my-3 rounded-full border-2 border-transparent px-6 pt-3 pb-2 font-bold text-white transition-all duration-300 hover:border-white"
                        />
                      ))
                  : posts
                      .filter((post: PostMeta) => post.slug.includes(".sv"))
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
          <Projects />
          <Newsletter />
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts().map((post) => post.meta);
  return {
    props: { posts },
  };
};
