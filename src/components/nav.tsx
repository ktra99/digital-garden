import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/20/solid";
import { widthAtom, xAtom } from "@src/atoms";
import { nav, navigation, pageVariants, variants } from "@src/data";
import useLocale from "@src/hooks/useLocale";
import useScroll from "@src/hooks/useScroll";
import { MDXPost, PostMeta } from "@src/types";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";

export function Desktop() {
  const translate = useLocale();
  const { locale } = useRouter();
  const [x, setX] = useAtom(xAtom);
  const [width, setWidth] = useAtom(widthAtom);
  const coordinates = nav[locale as keyof {}] as { x: number; width: number }[];
  return (
    <nav className="-ml-9 hidden w-full items-center justify-between md:mt-12 md:flex xl:mt-24">
      <div
        className="relative space-x-12 text-lg font-semibold text-white"
        onMouseLeave={() => {
          setX(coordinates[0].x);
          setWidth(coordinates[0].width);
        }}
      >
        <div
          className="absolute top-[-0.2rem] left-[2.1rem] h-8 rounded-md bg-white/10 transition-all duration-150"
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

export function Mobile() {
  return (
    <motion.nav
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed bottom-5 z-20 flex w-full justify-center md:hidden"
    >
      <div className="mx-auto flex w-full max-w-[15rem] items-center justify-between rounded-md border border-white/30 bg-white/25 bg-opacity-90 py-4 px-8 backdrop-blur-md xs:max-w-[20rem]">
        {navigation.map((item, index) => (
          <Link key={index} href={item.href} aria-label={item.href}>
            <item.icon className="h-7 w-7 text-white/80 transition duration-300 xs:h-9 xs:w-9" />
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}

export function Blog({ post, posts }: { post: MDXPost; posts: PostMeta[] }) {
  const { locale } = useRouter();
  const scrollPosition = useScroll();
  const nextPost = posts.filter((item) => item.locale === locale)[
    posts
      .filter((item) => item.locale === locale)
      .findIndex((item) => item.slug === post.meta.slug) + 1
  ].slug;
  return (
    <AnimatePresence>
      {scrollPosition > 3 && scrollPosition < 93 && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed bottom-0 mx-auto flex w-full items-center justify-center space-x-4 bg-zinc-900/90 py-6 backdrop-blur-sm"
        >
          <Link
            href="/"
            aria-label="back"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#242427] transition duration-300 hover:border-white"
          >
            <ArrowLongLeftIcon className="h-6 w-6 text-white/40 transition duration-300 group-hover:text-white" />
          </Link>
          <div className="flex w-48 items-center justify-between rounded-full bg-[#242427] py-2 px-4">
            <div className="w-28">
              <span
                className="block h-1 rounded-full bg-white/80"
                style={{ width: scrollPosition + "%" }}
              ></span>
            </div>
            <span className="text-white">{scrollPosition.toFixed(0)}%</span>
          </div>
          <AnimatePresence mode="wait">
            {scrollPosition >= 60 && nextPost ? (
              <motion.div
                key={1}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Link
                  href={"/" + locale + "/posts/" + nextPost}
                  aria-label="next"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#242427] transition duration-300 hover:border-white"
                >
                  <ArrowLongRightIcon className="h-6 w-6 text-white/40 transition duration-300 group-hover:text-white" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={2}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <button
                  type="button"
                  onClick={() => window.scrollTo(0, 0)}
                  aria-label="next"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#242427] transition duration-300 hover:border-white"
                >
                  <ArrowLongUpIcon className="h-6 w-6 text-white/40 transition duration-300 group-hover:text-white" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
