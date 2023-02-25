import { variants } from "@src/data";
import { PostMeta } from "@src/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Post({ post }: { post: PostMeta }) {
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
