import Tag from "@src/components/tag";
import { PostMeta } from "@src/types";
import { useRouter } from "next/router";

export function Desktop({ posts }: { posts: PostMeta[] }) {
  const { locale } = useRouter();
  return (
    <div className="hidden sm:block">
      <div className="my-12 flex max-w-lg flex-wrap items-center justify-end space-x-6 text-lg xl:mt-24">
        {posts
          .filter((post: PostMeta) => post.locale === locale)
          .map((post: PostMeta) => (
            <Tag
              key={post.slug}
              post={post}
              className="my-3 rounded-full border-2 border-transparent px-6 pt-3 pb-2 font-bold text-white transition-all duration-300 hover:border-white"
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
      <div className="flex flex-wrap items-center text-xs xs:text-sm sm:space-x-2">
        {posts
          .filter((post: PostMeta) => post.locale === locale)
          .map((post: PostMeta) => (
            <Tag
              key={post.slug}
              post={post}
              className="my-1 mr-2 rounded-md border-2 border-transparent px-3 pt-2 pb-1 font-bold text-white transition-all duration-300 hover:border-white sm:mx-0 sm:my-3"
            />
          ))}
      </div>
    </div>
  );
}
