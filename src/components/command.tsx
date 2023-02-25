import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { commandAtom } from "@src/atoms";
import clsx from "clsx";
import { useAtom } from "jotai";
import { Fragment, useState } from "react";
import { PostMeta } from "@src/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { format } from "date-fns";

export default function Command({ posts }: { posts: PostMeta[] }) {
  const { locale } = useRouter();
  const [query, setQuery] = useState("");
  const [command, setCommand] = useAtom(commandAtom);
  return (
    <Transition.Root
      show={command}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-50" onClose={setCommand}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/5 bg-opacity-25 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white font-sans shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={() => null}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                <Combobox.Options
                  static
                  className="max-h-96 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                >
                  {posts
                    .filter(
                      (post) =>
                        (post.title
                          .toLowerCase()
                          .includes(query.toLowerCase()) ||
                          post.tag
                            .toLowerCase()
                            .includes(query.toLowerCase())) &&
                        post.locale === locale
                    )
                    .map((post) => (
                      <Combobox.Option
                        key={post.slug}
                        value={post.slug}
                        className={({ active }) =>
                          clsx(
                            "cursor-default select-none px-4 py-2",
                            active && "bg-gray-50 text-white"
                          )
                        }
                      >
                        <article
                          key={post.slug}
                          className="flex max-w-xl flex-col items-start justify-between"
                        >
                          <div className="flex items-center gap-x-4 text-xs">
                            <time
                              dateTime={format(post.date, "yyyy-MM-dd")}
                              className="text-gray-500"
                            >
                              {format(post.date, "yyyy-MM-dd")}
                            </time>
                            <span className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100">
                              {post.tag}
                            </span>
                          </div>
                          <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                              <Link href={"/" + locale + "/posts/" + post.slug}>
                                <span className="absolute inset-0" />
                                {post.title}
                              </Link>
                            </h3>
                            <p className="line-clamp-3 mt-5 text-sm leading-6 text-gray-600">
                              {post.excerpt}
                            </p>
                          </div>
                        </article>
                      </Combobox.Option>
                    ))}
                </Combobox.Options>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
