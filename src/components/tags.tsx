import { tagAtom } from "@src/atoms";
import { PostMeta } from "@src/types";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

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
            tags.includes(post.tag) ? "bg-white/40" : "bg-white/5",
            "border-2 border-transparent font-bold text-white transition-all duration-300 hover:border-white",
            className
          )}
        >
          {post.tag}
        </button>
      }
    </>
  );
}

export function Desktop({ posts }: { posts: PostMeta[] }) {
  const { locale } = useRouter();
  return (
    <div className="hidden sm:block">
      <div className="my-12 flex max-w-lg flex-wrap items-center justify-end space-x-6 xl:mt-24">
        {posts
          .filter((post: PostMeta) => post.locale === locale)
          .slice(0, 5)
          .map((post: PostMeta) => (
            <Tag
              key={post.slug}
              post={post}
              className="my-3 rounded-full px-6 pt-3 pb-2 text-lg"
            />
          ))}
      </div>
    </div>
  );
}

export function Mobile({ posts }: { posts: PostMeta[] }) {
  const { locale } = useRouter();
  return (
    <div className="my-6 sm:mb-12 sm:hidden">
      <div className="flex flex-wrap items-center sm:space-x-2">
        {posts
          .filter((post: PostMeta) => post.locale === locale)
          .slice(0, 5)
          .map((post: PostMeta) => (
            <Tag
              key={post.slug}
              post={post}
              className="my-1 mr-2 rounded-md px-3 pt-2 pb-1 text-xs xs:text-sm sm:mx-0 sm:my-3"
            />
          ))}
      </div>
    </div>
  );
}
