import { MoonIcon } from "@heroicons/react/20/solid";
import { widthAtom, xAtom } from "@src/atoms";
import { nav } from "@src/data";
import { PostMeta, Slugs } from "@src/types";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

function Language({
  posts,
  language,
}: {
  posts: PostMeta[];
  language: string;
}) {
  const [_x, setX] = useAtom(xAtom);
  const { push, query, locale } = useRouter();
  const [_width, setWidth] = useAtom(widthAtom);
  const coordinates = nav[language as keyof {}] as {
    x: number;
    width: number;
  }[];
  const url = query.slug
    ? posts.filter((post) => post.slug.includes(query.slug as string))[0].slugs[
        language as keyof Slugs
      ]
    : "/";
  return (
    <button
      type="button"
      onClick={() => {
        setX(coordinates[0].x);
        setWidth(coordinates[0].width);
        push(url, url, {
          locale: language,
          scroll: false,
        });
      }}
      className={clsx(
        locale === language ? "text-white" : "text-white/50",
        "uppercase"
      )}
      disabled={locale === language}
    >
      {language}
    </button>
  );
}

function Locale({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <div className="text-lg font-bold text-white/50">
        <Language posts={posts} language="en" /> |{" "}
        <Language posts={posts} language="sv" />
      </div>
    </>
  );
}

export default function Navbar({ posts }: { posts: PostMeta[] }) {
  return (
    <nav className="sticky top-0 z-30 bg-zinc-900 bg-opacity-90 py-3 backdrop-blur-md">
      <div className="flex w-full items-center justify-between px-4">
        <button type="button" aria-label="dark mode">
          <MoonIcon className="h-6 w-6 text-white/80" />
        </button>
        <Locale posts={posts} />
      </div>
    </nav>
  );
}
