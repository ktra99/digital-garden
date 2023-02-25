import { widthAtom, xAtom } from "@src/atoms";
import Command from "@src/components/command";
import { Page as PageFooter } from "@src/components/footer";
import { Hero, Tablet as TabletHero } from "@src/components/hero";
import Navbar from "@src/components/navbar";
import Newsletter from "@src/components/newsletter";
import Posts from "@src/components/posts";
import Projects from "@src/components/projects";
import Stats from "@src/components/stats";
import { Mobile as MobileTags } from "@src/components/tags";
import { pageVariants } from "@src/data";
import useLocale from "@src/hooks/useLocale";
import { getAllPosts } from "@src/pages/api";
import { PostMeta } from "@src/types";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useAtom } from "jotai";
import MouseFollower from "mouse-follower";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

MouseFollower.registerGSAP(gsap);

export default function Home({ posts }: { posts: PostMeta[] }) {
  const translate = useLocale();
  const { locale } = useRouter();
  const [_x, setX] = useAtom(xAtom);
  const [width, setWidth] = useAtom(widthAtom);
  const [cursor, setCursor] = useState<MouseFollower | null>(null);
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
            <Hero />
            <Posts posts={posts} />
            <MobileTags posts={posts} />
          </div>
          <TabletHero posts={posts} />
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
