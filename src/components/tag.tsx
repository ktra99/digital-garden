import { tagAtom } from "@src/atoms";
import { PostMeta } from "@src/types";
import clsx from "clsx";
import { useAtom } from "jotai";

export default function Tag({
  post,
  className,
}: {
  post: PostMeta;
  className: string;
}) {
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
            className
          )}
        >
          {post.tag}
        </button>
      }
    </>
  );
}
