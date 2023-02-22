import {
  ArrowTopRightOnSquareIcon,
  ArrowsPointingOutIcon,
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
import { Dispatch, SetStateAction } from "react";
import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

const tagAtom = atomWithStorage<string[]>("tags", []);

const projects = [
  {
    name: "Digital garden",
    href: "https://github.com/ktra99/digital-garden",
  },
  {
    name: "To do app",
    href: "https://github.com/ktra99/todo",
  },
  {
    name: "Ecommerce template",
    href: "https://github.com/ktra99/ecommerce",
  },
  {
    name: "Geoguessr inspired game",
    href: "https://github.com/ktra99/geo",
  },
  {
    name: "Bank ID mockup",
    href: "https://github.com/ktra99/bankid",
  },
];

function Modal() {
  const { locale } = useRouter();
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
    >
      <div className="relative h-full min-h-[10rem] rounded-lg border-2 border-[#FAB0EB] bg-[#6973E9] p-6 transition duration-300">
        <div className="flex h-full max-w-[30rem] items-center justify-center space-y-6">
          <h2 className="text-xs font-bold text-white xs:text-base sm:text-xl">
            {locale === "en" ? "View more" : "Visa mer"}
          </h2>
          <div className="block text-xl font-semibold">
            <button
              type="button"
              className="group absolute inset-0 z-20 flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-black hover:bg-opacity-60 hover:backdrop-blur-sm"
            >
              <ArrowsPointingOutIcon className="h-6 w-6 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 xs:h-10 xs:w-10" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DesktopNav({
  x,
  width,
  setX,
  setWidth,
}: {
  x: number;
  width: number;
  setX: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
}) {
  const { route, locale } = useRouter();
  return (
    <nav className="-ml-9 flex w-full items-center justify-between md:mt-12 xl:mt-24">
      {locale === "en" ? (
        <div
          className={clsx(
            route.includes("/posts/") && "md:hidden",
            "relative hidden space-x-12 text-lg font-semibold text-white md:block"
          )}
          onMouseLeave={() => {
            setX(0);
            setWidth(4);
          }}
        >
          <div
            className="absolute top-[-0.2rem] left-[2.1rem] h-8 rounded-lg bg-[#AF7DE2] transition-all duration-150"
            style={{ width: width + "rem", translate: x + "rem" }}
          ></div>
          <Link
            href="/"
            className="relative"
            onMouseEnter={() => {
              setX(0);
              setWidth(4);
            }}
          >
            HOME
          </Link>
          <Link
            href="https://dashboard.ktra99.dev/"
            className="relative"
            onMouseEnter={() => {
              setX(5.15);
              setWidth(7);
            }}
          >
            DASHBOARD
          </Link>
          <Link
            href="#projects"
            className="relative"
            onMouseEnter={() => {
              setX(13.2);
              setWidth(6.5);
            }}
          >
            PROJECTS
          </Link>
          <Link
            href="mailto:kennytran.dev@outlook.com"
            className="relative"
            onMouseEnter={() => {
              setX(20.65);
              setWidth(6);
            }}
          >
            CONTACT
          </Link>
        </div>
      ) : (
        <div
          className={clsx(
            route.includes("/posts/") && "md:hidden",
            "relative hidden space-x-12 text-lg font-semibold text-white md:block"
          )}
          onMouseLeave={() => {
            setX(0.05);
            setWidth(3.5);
          }}
        >
          <div
            className="absolute top-[-0.2rem] left-[2.1rem] h-8 rounded-lg bg-[#AF7DE2] transition-all duration-150"
            style={{ width: width + "rem", translate: x + "rem" }}
          ></div>
          <Link
            href="/"
            className="relative"
            onMouseEnter={() => {
              setX(0.05);
              setWidth(3.5);
            }}
          >
            HEM
          </Link>
          <Link
            href="https://dashboard.ktra99.dev/"
            className="relative"
            onMouseEnter={() => {
              setX(4.65);
              setWidth(7);
            }}
          >
            DASHBOARD
          </Link>
          <Link
            href="#projects"
            className="relative"
            onMouseEnter={() => {
              setX(12.75);
              setWidth(5.75);
            }}
          >
            PROJEKT
          </Link>
          <Link
            href="mailto:kennytran.dev@outlook.com"
            className="relative"
            onMouseEnter={() => {
              setX(19.5);
              setWidth(6);
            }}
          >
            KONTAKT
          </Link>
        </div>
      )}
    </nav>
  );
}

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
      layout
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
    >
      <div className="relative h-full rounded-lg border-2 border-[#FAB0EB] bg-[#6973E9] p-6 transition duration-300">
        <div className="max-w-[30rem] space-y-6">
          <h2 className="text-xs font-bold text-white xs:text-base sm:text-xl">
            {post.title}
          </h2>
          <Link
            locale="en"
            href={"/" + locale + "/posts/" + post.slug}
            className="block text-xl font-semibold"
          >
            <span className="group absolute inset-0 z-20 flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-black hover:bg-opacity-60 hover:backdrop-blur-sm">
              <ArrowTopRightOnSquareIcon className="h-10 w-10 text-white opacity-0 transition-all duration-300 group-hover:opacity-100" />
            </span>
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
    <footer className="mx-auto my-4 px-4 sm:max-w-[33rem] sm:px-0 xl:max-w-7xl xl:px-4">
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

export default function Home({
  x,
  width,
  posts,
  setX,
  setWidth,
}: {
  x: number;
  width: number;
  posts: PostMeta[];
  setX: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
}) {
  const { locale } = useRouter();
  const [tags] = useAtom(tagAtom);
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
          <div className="xl:order-0 order-1 mt-12 flex flex-col sm:mt-0 sm:w-[33rem] xl:w-[36rem]">
            <div className="block sm:mt-12 sm:hidden xl:block">
              <Header />
              <DesktopNav x={x} width={width} setX={setX} setWidth={setWidth} />
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
                      <Modal />
                    </>
                  ) : (
                    <>
                      {posts
                        .filter((post: PostMeta) => post.slug.includes(".en"))
                        .map((post: PostMeta) => (
                          <Post post={post} key={post.slug} />
                        ))}
                      <Modal />
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
                    <Modal />
                  </>
                ) : (
                  <>
                    {posts
                      .filter((post: PostMeta) => post.slug.includes(".sv"))
                      .map((post: PostMeta) => (
                        <Post post={post} key={post.slug} />
                      ))}
                    <Modal />
                  </>
                )}
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
                          className="my-1 mr-2 rounded-md border-2 border-transparent px-4 pt-2 pb-1 font-bold text-white transition-all duration-300 hover:border-white sm:mx-0 sm:my-3"
                        />
                      ))
                  : posts
                      .filter((post: PostMeta) => post.slug.includes(".sv"))
                      .map((post: PostMeta) => (
                        <Tag
                          key={post.slug}
                          post={post}
                          className="my-1 mr-2 rounded-md border-2 border-transparent px-4 pt-2 pb-1 font-bold text-white transition-all duration-300 hover:border-white sm:mx-0 sm:my-3"
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
              <DesktopNav x={x} width={width} setX={setX} setWidth={setWidth} />
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
        <div id="projects" className="mx-auto my-24 w-full max-w-7xl px-4">
          <div className="divide-y divide-white">
            <h2 className="text-4xl font-bold leading-10 tracking-tight text-white">
              {locale === "en" ? "Projects" : "Projekt"}
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
        <div className="relative isolate my-36 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:max-w-none lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {locale === "en"
                    ? "Subscribe to my newsletter."
                    : "Prenumerera på mitt nyhetsbrev."}
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-300">
                  Nostrud amet eu ullamco nisi aute in ad minim nostrud
                  adipisicing velit quis. Duis tempor incididunt dolore.
                </p>
                <div className="mt-6 flex max-w-md gap-x-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-auto rounded-md border-2 border-transparent bg-white/5 px-3.5 py-2 text-white placeholder-white shadow-sm outline-none ring-1 ring-inset ring-white/10 transition-all duration-300 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md border-2 border-transparent bg-[#3F49C2] py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F49C2]"
                    disabled
                  >
                    Subscribe
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
                    Weekly articles
                  </dt>
                  <dd className="mt-2 leading-7 text-gray-300">
                    Non laboris consequat cupidatat laborum magna. Eiusmod non
                    irure cupidatat duis commodo amet.
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <HandRaisedIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <dt className="mt-4 font-semibold text-white">No spam</dt>
                  <dd className="mt-2 leading-7 text-gray-300">
                    Officia excepteur ullamco ut sint duis proident non
                    adipisicing. Voluptate incididunt anim.
                  </dd>
                </div>
              </dl>
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
