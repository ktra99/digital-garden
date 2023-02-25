import { tagAtom } from "@src/atoms";
import Post from "@src/components/post";
import { variants } from "@src/data";
import useLocale from "@src/hooks/useLocale";
import { PostMeta } from "@src/types";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { commandAtom } from "@src/atoms";

export default function Posts({ posts }: { posts: PostMeta[] }) {
  const translate = useLocale();
  const { locale } = useRouter();
  const [tags] = useAtom(tagAtom);
  const [_, setCommand] = useAtom(commandAtom);
  return (
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
                    onClick={() => setCommand(true)}
                    className="absolute inset-0 z-20 flex items-center justify-center rounded-md border-2 border-transparent text-xl font-semibold transition-all duration-300 hover:border-white"
                  ></button>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            {posts
              .filter((post: PostMeta) => post.locale === locale)
              .map((post: PostMeta) => (
                <Post post={post} key={post.slug} />
              ))}
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
                    onClick={() => setCommand(true)}
                    className="absolute inset-0 z-20 flex items-center justify-center rounded-md border-2 border-transparent text-xl font-semibold transition-all duration-300 hover:border-white"
                  ></button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
