import { Popover, Transition } from "@headlessui/react";
import {
  FolderIcon,
  PaintBrushIcon,
  PhotoIcon,
  SwatchIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { consentAtom } from "@src/atoms";
import { ConsentParams, PostMeta, Slugs } from "@src/types";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Fragment } from "react";

const navigation = [
  { name: "Kanban", href: "#", icon: SwatchIcon, finished: false },
  { name: "Gallery", href: "#", icon: PhotoIcon, finished: false },
  { name: "Moodboard", href: "#", icon: FolderIcon, finished: false },
  { name: "Brand", href: "#", icon: PaintBrushIcon, finished: false },
];

function Language({
  posts,
  language,
}: {
  posts: PostMeta[];
  language: string;
}) {
  const { push, route, query, locale } = useRouter();
  const url = query.slug
    ? (posts.find((post) => post.slug.includes(query.slug as string))?.slugs[
        language as keyof Slugs
      ] as string)
    : route === "/policy"
    ? "/policy"
    : "/";
  return (
    <button
      type="button"
      onClick={() =>
        push(url, url, {
          locale: language,
          scroll: false,
        })
      }
      className={clsx(
        locale === language
          ? "text-zinc-900 sm:text-white"
          : "text-zinc-900/50 sm:text-white/50",
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
      <div className="mt-6 mb-3 space-x-4 pl-[1.15rem] font-sans text-xs font-bold text-zinc-900/50 sm:mt-0 sm:mb-0 sm:text-base sm:text-white/50">
        <Language posts={posts} language="en" />
        <Language posts={posts} language="sv" />
      </div>
    </>
  );
}

export default function Navbar({ posts }: { posts: PostMeta[] }) {
  const { push } = useRouter();
  const [_consent, setConsent] = useAtom(consentAtom);
  const resetCookies = () => {
    setConsent(null);
    gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
      personalization_storage: "denied",
    } as ConsentParams);
  };
  return (
    <nav className="sticky top-0 z-30 bg-zinc-900 bg-opacity-90 py-3 backdrop-blur-md">
      <div className="flex w-full items-center justify-between px-4">
        <button
          type="button"
          onClick={resetCookies}
          aria-label="cookie preferences"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white/80"
          >
            <path
              d="M9.98372 19.9999C4.47237 19.9938 0.0060525 15.5203 0 9.99995C0.393106 10.1112 0.799546 10.168 1.20803 10.1689C2.55933 10.1789 3.82888 9.52175 4.6025 8.41195C5.29413 7.41154 5.44027 6.13091 4.99186 4.99997C5.27858 5.05119 5.5692 5.07729 5.86045 5.07797C7.1552 5.08764 8.38408 4.50698 9.2 3.49998C9.99844 2.52274 10.3106 1.2352 10.0486 0C15.5625 0.0179493 20.0178 4.50963 19.9999 10.0324C19.982 15.5553 15.4976 20.0178 9.98372 19.9999ZM10.7455 16.5679C10.8991 16.634 11.0645 16.6681 11.2317 16.6679C11.7362 16.6674 12.1909 16.363 12.3842 15.8961C12.5775 15.4293 12.4714 14.8919 12.1152 14.5339C11.8805 14.2998 11.5629 14.1683 11.2317 14.1679C10.6392 14.1693 10.1294 14.5877 10.0115 15.1693C9.89371 15.7509 10.2004 16.3353 10.7455 16.5679ZM4.91199 14.8749C5.11205 14.9578 5.32647 15.0003 5.54296 14.9999C6.21842 14.9997 6.82678 14.5907 7.08272 13.9646C7.33866 13.3385 7.19143 12.6195 6.71006 12.1449C6.3989 11.838 5.97969 11.6659 5.54296 11.6659C4.62442 11.667 3.88022 12.4129 3.87967 13.3329C3.87984 14.0017 4.2781 14.606 4.89202 14.8689H4.89702H4.908L4.91199 14.8749ZM14.3276 12.3679C14.9987 12.6502 15.775 12.4627 16.2439 11.9051C16.7127 11.3475 16.7652 10.5493 16.3733 9.93495C16.2506 9.74359 16.0902 9.57925 15.9021 9.45195C15.3853 9.10239 14.7167 9.07155 14.17 9.37206C13.6233 9.67256 13.2902 10.254 13.307 10.8784C13.3238 11.5028 13.6877 12.0654 14.2498 12.3359H14.2378L14.2677 12.3489L14.2877 12.3569H14.2817C14.296 12.3615 14.31 12.3669 14.3236 12.3729L14.3276 12.3679ZM9.98372 8.33295C9.58552 8.33229 9.24259 8.61412 9.16546 9.00541C9.08833 9.39671 9.2986 9.78793 9.66717 9.93889C10.0357 10.0899 10.4594 9.95831 10.6782 9.62501C10.8969 9.2917 10.8493 8.84995 10.5648 8.57095C10.4906 8.49777 10.4032 8.4394 10.3072 8.39896L10.2892 8.39095L10.2623 8.38095C10.1729 8.349 10.0786 8.33276 9.98372 8.33295ZM13.7276 4.16697C13.0888 4.16539 12.5526 4.64873 12.4871 5.28522C12.4216 5.92172 12.8481 6.50444 13.4738 6.63339C14.0995 6.76235 14.7211 6.39562 14.9118 5.78494C15.1025 5.17425 14.8004 4.51814 14.2128 4.26698H14.2028C14.0525 4.20267 13.8911 4.16869 13.7276 4.16697ZM2.49593 7.49996C2.03663 7.49996 1.66429 7.12701 1.66429 6.66696C1.66429 6.20691 2.03663 5.83397 2.49593 5.83397C2.95523 5.83397 3.32757 6.20691 3.32757 6.66696C3.32702 7.12679 2.95501 7.49941 2.49593 7.49996ZM1.24797 4.99997C0.558733 4.99997 0 4.44033 0 3.74998C0 3.05963 0.558733 2.49999 1.24797 2.49999C1.9372 2.49999 2.49593 3.05963 2.49593 3.74998C2.49483 4.43988 1.93674 4.99887 1.24797 4.99997ZM6.23983 3.33298C5.55059 3.33298 4.99186 2.77334 4.99186 2.08299C4.99186 1.39264 5.55059 0.832996 6.23983 0.832996C6.92906 0.832996 7.48779 1.39264 7.48779 2.08299C7.48779 2.7735 6.92922 3.33343 6.23983 3.33398V3.33298ZM3.32857 1.66699C2.8694 1.66699 2.49711 1.29425 2.49693 0.834328C2.49675 0.374408 2.86873 0.00136823 3.32791 0.000999989C3.78708 0.000632288 4.15967 0.373075 4.16022 0.832996C4.16022 1.29321 3.78804 1.66644 3.32857 1.66699Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <div className="flex items-center space-x-6">
          <Popover as="header">
            {({ open }) => (
              <>
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-white ring-2 ring-white hover:bg-opacity-10 focus:outline-none sm:hidden">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>

                <Transition.Root as={Fragment}>
                  <div className="sm:hidden">
                    <Transition.Child
                      as={Fragment}
                      enter="duration-150 ease-out"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="duration-150 ease-in"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                      as={Fragment}
                      enter="duration-150 ease-out"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="duration-150 ease-in"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Popover.Panel
                        focus
                        className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                      >
                        <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="pt-3 pb-2">
                            <div className="flex flex-row-reverse items-center justify-between px-4">
                              <div className="-mr-2">
                                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset">
                                  <span className="sr-only">Close menu</span>
                                  <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </Popover.Button>
                              </div>
                              <button
                                type="button"
                                onClick={resetCookies}
                                aria-label="cookie preferences"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="text-zinc/80"
                                >
                                  <path
                                    d="M9.98372 19.9999C4.47237 19.9938 0.0060525 15.5203 0 9.99995C0.393106 10.1112 0.799546 10.168 1.20803 10.1689C2.55933 10.1789 3.82888 9.52175 4.6025 8.41195C5.29413 7.41154 5.44027 6.13091 4.99186 4.99997C5.27858 5.05119 5.5692 5.07729 5.86045 5.07797C7.1552 5.08764 8.38408 4.50698 9.2 3.49998C9.99844 2.52274 10.3106 1.2352 10.0486 0C15.5625 0.0179493 20.0178 4.50963 19.9999 10.0324C19.982 15.5553 15.4976 20.0178 9.98372 19.9999ZM10.7455 16.5679C10.8991 16.634 11.0645 16.6681 11.2317 16.6679C11.7362 16.6674 12.1909 16.363 12.3842 15.8961C12.5775 15.4293 12.4714 14.8919 12.1152 14.5339C11.8805 14.2998 11.5629 14.1683 11.2317 14.1679C10.6392 14.1693 10.1294 14.5877 10.0115 15.1693C9.89371 15.7509 10.2004 16.3353 10.7455 16.5679ZM4.91199 14.8749C5.11205 14.9578 5.32647 15.0003 5.54296 14.9999C6.21842 14.9997 6.82678 14.5907 7.08272 13.9646C7.33866 13.3385 7.19143 12.6195 6.71006 12.1449C6.3989 11.838 5.97969 11.6659 5.54296 11.6659C4.62442 11.667 3.88022 12.4129 3.87967 13.3329C3.87984 14.0017 4.2781 14.606 4.89202 14.8689H4.89702H4.908L4.91199 14.8749ZM14.3276 12.3679C14.9987 12.6502 15.775 12.4627 16.2439 11.9051C16.7127 11.3475 16.7652 10.5493 16.3733 9.93495C16.2506 9.74359 16.0902 9.57925 15.9021 9.45195C15.3853 9.10239 14.7167 9.07155 14.17 9.37206C13.6233 9.67256 13.2902 10.254 13.307 10.8784C13.3238 11.5028 13.6877 12.0654 14.2498 12.3359H14.2378L14.2677 12.3489L14.2877 12.3569H14.2817C14.296 12.3615 14.31 12.3669 14.3236 12.3729L14.3276 12.3679ZM9.98372 8.33295C9.58552 8.33229 9.24259 8.61412 9.16546 9.00541C9.08833 9.39671 9.2986 9.78793 9.66717 9.93889C10.0357 10.0899 10.4594 9.95831 10.6782 9.62501C10.8969 9.2917 10.8493 8.84995 10.5648 8.57095C10.4906 8.49777 10.4032 8.4394 10.3072 8.39896L10.2892 8.39095L10.2623 8.38095C10.1729 8.349 10.0786 8.33276 9.98372 8.33295ZM13.7276 4.16697C13.0888 4.16539 12.5526 4.64873 12.4871 5.28522C12.4216 5.92172 12.8481 6.50444 13.4738 6.63339C14.0995 6.76235 14.7211 6.39562 14.9118 5.78494C15.1025 5.17425 14.8004 4.51814 14.2128 4.26698H14.2028C14.0525 4.20267 13.8911 4.16869 13.7276 4.16697ZM2.49593 7.49996C2.03663 7.49996 1.66429 7.12701 1.66429 6.66696C1.66429 6.20691 2.03663 5.83397 2.49593 5.83397C2.95523 5.83397 3.32757 6.20691 3.32757 6.66696C3.32702 7.12679 2.95501 7.49941 2.49593 7.49996ZM1.24797 4.99997C0.558733 4.99997 0 4.44033 0 3.74998C0 3.05963 0.558733 2.49999 1.24797 2.49999C1.9372 2.49999 2.49593 3.05963 2.49593 3.74998C2.49483 4.43988 1.93674 4.99887 1.24797 4.99997ZM6.23983 3.33298C5.55059 3.33298 4.99186 2.77334 4.99186 2.08299C4.99186 1.39264 5.55059 0.832996 6.23983 0.832996C6.92906 0.832996 7.48779 1.39264 7.48779 2.08299C7.48779 2.7735 6.92922 3.33343 6.23983 3.33398V3.33298ZM3.32857 1.66699C2.8694 1.66699 2.49711 1.29425 2.49693 0.834328C2.49675 0.374408 2.86873 0.00136823 3.32791 0.000999989C3.78708 0.000632288 4.15967 0.373075 4.16022 0.832996C4.16022 1.29321 3.78804 1.66644 3.32857 1.66699Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="mt-3 space-y-1 px-1">
                              {navigation.map((item) => (
                                <button
                                  key={item.name}
                                  type="button"
                                  onClick={() => push(item.href)}
                                  disabled={!item.finished}
                                  className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                >
                                  <item.icon className="h-5 w-5 text-gray-900" />
                                  <span>{item.name}</span>
                                </button>
                              ))}
                            </div>
                            <Locale posts={posts} />
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition.Child>
                  </div>
                </Transition.Root>
              </>
            )}
          </Popover>
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                type="button"
                aria-label={item.name}
                onClick={() => push(item.href)}
                disabled={!item.finished}
              >
                <item.icon
                  className={clsx(
                    item.finished ? "text-white" : "text-white/50",
                    "h-5 w-5"
                  )}
                />
              </button>
            ))}
            <Locale posts={posts} />
          </div>
        </div>
      </div>
    </nav>
  );
}
