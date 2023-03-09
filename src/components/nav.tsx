import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/20/solid";
import { variants } from "@src/data";
import useScroll from "@src/hooks/useScroll";
import { MDXPost, PostMeta } from "@src/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

export function Blog({ post, posts }: { post: MDXPost; posts: PostMeta[] }) {
  const { locale } = useRouter();
  const [scrollPosition] = useScroll();
  const nextPost = posts.filter((item) => item.locale === locale)[
    posts
      .filter((item) => item.locale === locale)
      .findIndex((item) => item.slug === post.meta.slug) + 1
  ];
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
          <div className="flex w-32 items-center justify-between rounded-full bg-[#242427] py-2 px-4 xs:w-48">
            <AnimatePresence mode="wait">
              {scrollPosition >= 75 && nextPost?.slug ? (
                <motion.p
                  key={1}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-16 truncate py-1 text-xs text-white xs:w-32"
                >
                  {nextPost.title}
                </motion.p>
              ) : (
                <motion.div
                  key={2}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex w-full items-center justify-between"
                >
                  <div className="w-14 xs:w-28">
                    <span
                      className="block h-1 rounded-full bg-white/80"
                      style={{ width: scrollPosition + "%" }}
                    ></span>
                  </div>
                  <span className="text-white">
                    {scrollPosition.toFixed(0)}%
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            {scrollPosition >= 75 && nextPost?.slug ? (
              <motion.div
                key={1}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Link
                  href={"/" + locale + "/posts/" + nextPost.slug}
                  aria-label="next"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#242427] transition duration-300 hover:border-white"
                >
                  <ArrowLongRightIcon className="h-6 w-6 text-white/40 transition duration-300 group-hover:text-white" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={2}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <button
                  type="button"
                  onClick={() => window.scrollTo(0, 0)}
                  aria-label="up"
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
