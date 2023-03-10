import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import Avatar from "@public/avatar.png";
import Command from "@src/components/command";
import Navbar from "@src/components/navbar";
import Posts from "@src/components/posts";
import {
  Desktop as DesktopTags,
  Mobile as MobileTags,
} from "@src/components/tags";
import useLocale from "@src/hooks/useLocale";
import { getAllPosts } from "@src/pages/api";
import { PostMeta } from "@src/types";
import {
  animate,
  motion,
  Transition,
  useInView,
  Variants,
} from "framer-motion";
import gsap from "gsap";
import MouseFollower from "mouse-follower";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import GitHubButton from "react-github-btn";

MouseFollower.registerGSAP(gsap);

const svgTransition: Transition = {
  duration: 1,
  ease: "easeIn",
};

const svgVariants: Variants = {
  initial: {
    pathLength: 0,
    transition: svgTransition,
  },
  animate: {
    pathLength: 1,
    transition: svgTransition,
  },
};

export const pageTransition: Transition = {
  duration: 0.5,
  ease: "easeInOut",
};

export const pageVariants: Variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: pageTransition,
  },
  exit: {
    y: 40,
    opacity: 0,
    transition: pageTransition,
  },
};

const projects = [
  {
    name: "Digital garden",
    image: "/digital-garden.png",
    href: "https://github.com/ktra99/digital-garden",
  },
];

function Arrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 187.568 118.302"
      width={375.136}
      height={236.605}
      filter="invert(93%) hue-rotate(180deg)"
      className="w-36 sm:w-48"
    >
      <defs>
        <style>
          {
            '@font-face{font-family:"Virgil";src:url(https://excalidraw.com/Virgil.woff2)}@font-face{font-family:"Cascadia";src:url(https://excalidraw.com/Cascadia.woff2)}'
          }
        </style>
      </defs>
      <text
        fontFamily="Virgil, Segoe UI Emoji"
        fontSize={20}
        style={{
          whiteSpace: "pre",
        }}
        dominantBaseline="text-before-edge"
        transform="translate(10 37.077)"
      >
        {"That's me"}
      </text>
      <g strokeLinecap="round">
        <motion.path
          variants={svgVariants}
          initial="initial"
          animate="animate"
          d="M109.155 9.996c11.52 7.96 72.14 33.28 68.23 49.5-3.9 16.22-76.59 39.64-91.66 47.84m21.85-95.1c11.55 8.57 72.72 32.16 69.46 48.17-3.26 16.01-74.05 40.21-89.01 47.9"
          stroke="#000"
          fill="none"
        />
        <motion.path
          variants={svgVariants}
          initial="initial"
          animate="animate"
          d="M108.745 89.736c-5.15.39-8.82 6.7-19.54 16.8m20.79-19.66c-4.63 5.87-9.55 9.55-21.5 20.94"
          stroke="#000"
          fill="none"
        />
        <motion.path
          variants={svgVariants}
          initial="initial"
          animate="animate"
          d="M116.765 108.616c-6.98-3.53-12.3-1.15-27.56-2.08m28.82-.77c-6.25 1.72-12.96 1.18-29.53 2.05"
          stroke="#000"
          fill="none"
        />
      </g>
    </svg>
  );
}

function Counter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(nodeRef);
  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current as { textContent: string };
      const controls = animate(from, to, {
        duration: 1,
        onUpdate(value) {
          node.textContent = value.toFixed(2);
        },
      });
      return () => controls.stop();
    }
  }, [from, to, isInView]);
  return <p ref={nodeRef} />;
}

function Header() {
  const translate = useLocale();
  return (
    <header>
      <h2 className="text-4xl font-bold uppercase text-white xs:text-6xl sm:text-8xl">
        Kenny Tran
      </h2>
      <div className="mt-3 sm:w-[33rem]">
        <p className="text-lg leading-8 text-white">
          {translate(
            "Hey, I'm Kenny. I'm a developer based in Sweden. My strength lies in developing user friendly applications, with complex data and API integrations."
          )}
        </p>
      </div>
    </header>
  );
}

function Stats({ posts }: { posts: PostMeta[] }) {
  const translate = useLocale();
  const stats = [
    { id: 1, name: translate("Posts"), value: posts.length / 2 },
    { id: 2, name: translate("Projects"), value: projects.length },
    { id: 3, name: translate("Subscribers"), value: 0 },
  ];
  return (
    <div className="relative my-24 px-4">
      <dl className="flex flex-col items-center gap-y-16 gap-x-8 text-center sm:flex-row sm:justify-between">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col gap-y-4">
            <dt className="text-base leading-7 text-white">{stat.name}</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              <Counter to={stat.value} from={0} />
            </dd>
          </div>
        ))}
      </dl>
      <span id="stats" className="absolute -top-20"></span>
    </div>
  );
}

function Projects({ cursor }: { cursor: MouseFollower | null }) {
  const translate = useLocale();
  return (
    <div className="relative mx-auto my-24 w-full px-4">
      <div className="divide-y divide-white">
        <h2 className="text-4xl font-bold leading-10 tracking-tight text-white">
          {translate("Projects")}
        </h2>
        <div className="mt-10 space-y-6 divide-y divide-white">
          {projects.map((project) => (
            <div
              key={project.href}
              className="pt-6"
              onMouseEnter={() => cursor?.setImg(project.image)}
              onMouseLeave={() => cursor?.removeImg()}
            >
              <div className="relative flex w-full items-center justify-between">
                <span className="font-semibold leading-7 text-white sm:text-xl">
                  {project.name}
                </span>
                <a
                  href={project.href}
                  aria-label={project.name}
                  className="absolute inset-0 z-20"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ArrowTopRightOnSquareIcon className="ml-auto h-6 w-6 text-white" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <span id="projects" className="absolute -top-20"></span>
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
            <h2 className="mt-4 font-semibold text-white">
              {translate("Weekly articles")}
            </h2>
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
            <h2 className="mt-4 font-semibold text-white">
              {translate("No spam")}
            </h2>
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
      <div className="mt-4 mb-24 flex flex-col justify-between xs:mb-32 sm:mt-6 sm:flex-row sm:items-center">
        <div className="mb-2.5 sm:mb-0">
          <mark className="block bg-transparent font-semibold text-white xs:text-lg">
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

export default function Home({ posts }: { posts: PostMeta[] }) {
  const translate = useLocale();
  const { locale } = useRouter();
  const [cursor, setCursor] = useState<MouseFollower | null>(null);
  useEffect(() => {
    if (document.querySelectorAll(".mf-cursor").length) return;
    setCursor(new MouseFollower());
    return () => {
      document.querySelector(".mf-cursor")?.remove();
    };
  }, []);
  return (
    <>
      <NextSeo
        title="Kenny Tran"
        description={translate(
          "Hey, I'm Kenny. I'm a developer based in Sweden. My strength lies in developing user friendly applications, with complex data and API integrations."
        )}
        canonical="https://www.ktra99.dev/"
        openGraph={{
          title: "Kenny Tran",
          description: translate(
            "Hey, I'm Kenny. I'm a developer based in Sweden. My strength lies in developing user friendly applications, with complex data and API integrations."
          ),
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
      <Command posts={posts} />
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
            </div>
            <Posts posts={posts} />
            <MobileTags posts={posts} />
          </div>
          <div className="order-0 flex flex-col xl:order-1">
            <div className="mt-4 sm:mt-0">
              <div className="relative mx-auto h-64 w-64 rounded-full bg-white/5 ring-1 ring-white/20 sm:h-96 sm:w-96">
                <Image
                  src={Avatar}
                  alt="avatar"
                  width={900}
                  height={900}
                  placeholder="blur"
                  priority
                />
                <div className="absolute -top-20 -right-10">
                  <Arrow />
                </div>
              </div>
            </div>
            <div className="hidden sm:mt-12 sm:block xl:hidden">
              <Header />
            </div>
            <DesktopTags posts={posts} />
          </div>
        </div>
        <div className="mx-auto sm:max-w-[35rem] xl:max-w-7xl">
          <Stats posts={posts} />
          <Projects cursor={cursor} />
          <Newsletter />
        </div>
      </motion.main>
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
