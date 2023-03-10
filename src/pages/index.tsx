import Avatar from "@public/avatar.png";
import Command from "@src/components/command";
import { Page as PageFooter } from "@src/components/footer";
import Navbar from "@src/components/navbar";
import Newsletter from "@src/components/newsletter";
import Posts from "@src/components/posts";
import Projects from "@src/components/projects";
import Stats from "@src/components/stats";
import {
  Desktop as DesktopTags,
  Mobile as MobileTags,
} from "@src/components/tags";
import { pageVariants, svgVariants } from "@src/data";
import useLocale from "@src/hooks/useLocale";
import { getAllPosts } from "@src/pages/api";
import { PostMeta } from "@src/types";
import { motion } from "framer-motion";
import gsap from "gsap";
import MouseFollower from "mouse-follower";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

MouseFollower.registerGSAP(gsap);

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
      <PageFooter />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts().map((post) => post.meta);
  return {
    props: { posts },
  };
};
