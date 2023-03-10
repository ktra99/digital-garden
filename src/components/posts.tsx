import { commandAtom, tagAtom } from "@src/atoms";
import useLocale from "@src/hooks/useLocale";
import { fadeVariants } from "@src/pages/posts/[slug]";
import { PostMeta } from "@src/types";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";

function More() {
  const translate = useLocale();
  const [_, setCommand] = useAtom(commandAtom);
  return (
    <motion.div
      layout
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative flex h-full max-w-[30rem] items-center justify-center rounded-md bg-white/5 p-6 ring-1 ring-white/20 sm:min-h-[9rem]"
    >
      <h2 className="text-xs font-bold text-white/80 xs:text-base sm:text-xl">
        {translate("View more")}
      </h2>
      <button
        type="button"
        aria-label="view more"
        onClick={() => setCommand(true)}
        className="absolute inset-0 z-20 flex items-center justify-center rounded-md border-2 border-transparent text-xl font-semibold transition-all duration-300 hover:border-white"
      ></button>
    </motion.div>
  );
}

function Post({ post }: { post: PostMeta }) {
  const { locale } = useRouter();
  return (
    <motion.div
      layout
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative h-full rounded-md bg-white/5 p-6 ring-1 ring-white/20"
    >
      <h2 className="text-xs font-bold text-white/80 xs:text-base sm:text-xl">
        {post.title}
      </h2>
      <Link
        locale={locale}
        href={"/" + locale + "/posts/" + post.slug}
        aria-label={post.title}
        className="absolute inset-0 z-20 flex items-center justify-center rounded-md border-2 border-transparent text-xl font-semibold transition-all duration-300 hover:border-white"
      ></Link>
    </motion.div>
  );
}

export default function Posts({ posts }: { posts: PostMeta[] }) {
  const { locale } = useRouter();
  const [tags] = useAtom(tagAtom);
  return (
    <div className="order-2 mt-0 mb-4 grid gap-4 sm:grid-cols-2 xl:my-12">
      <AnimatePresence>
        {tags.length > 0 ? (
          <>
            {posts
              .filter(
                (post: PostMeta) =>
                  post.locale === locale && tags.includes(post.tag)
              )
              .slice(0, 5)
              .map((post: PostMeta) => (
                <Post post={post} key={post.slug} />
              ))}
          </>
        ) : (
          <>
            {posts
              .filter((post: PostMeta) => post.locale === locale)
              .slice(0, 5)
              .map((post: PostMeta) => (
                <Post post={post} key={post.slug} />
              ))}
          </>
        )}
        <More key={null} />
      </AnimatePresence>
    </div>
  );
}
