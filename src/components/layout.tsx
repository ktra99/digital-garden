import K from "@assets/k.png";
import {
  ChartBarSquareIcon,
  EnvelopeIcon,
  HomeIcon,
  RectangleStackIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function Layout({
  children,
  setActive,
}: {
  children?: ReactNode;
  setActive: Dispatch<SetStateAction<string[]>>;
}) {
  const { push, query, route, locale } = useRouter();
  return (
    <>
      <nav className="sticky top-0 z-30 py-4 backdrop-blur-md">
        <div className="flex w-full items-center justify-between px-4">
          <Link href="/" scroll={false}>
            <Image src={K} alt="brand logotype" className="h-6 w-6" />
          </Link>
          <div
            className={clsx(
              route.includes("/posts/") && "sm:hidden",
              "hidden space-x-12 text-lg font-semibold text-white sm:block"
            )}
          >
            <Link
              href="/"
              className={clsx(
                route === "/" && "border-b-2 border-[#FAB0EB]",
                "py-1"
              )}
            >
              {locale === "en" && "HOME"}
              {locale === "sv" && "HEM"}
            </Link>
            <a
              href="#"
              className={clsx(
                route === "/dashboard" && "border-b-2 border-[#FAB0EB]",
                "py-1"
              )}
            >
              {locale === "en" && "DASHBOARD"}
              {locale === "sv" && "DASHBOARD"}
            </a>
            <a
              href="#"
              className={clsx(
                route === "/projects" && "border-b-2 border-[#FAB0EB]",
                "py-1"
              )}
            >
              {locale === "en" && "PROJECTS"}
              {locale === "sv" && "PROJEKT"}
            </a>
            <a
              href="#"
              className={clsx(
                route === "/contact" && "border-b-2 border-[#FAB0EB]",
                "py-1"
              )}
            >
              {locale === "en" && "CONTACT"}
              {locale === "sv" && "KONTAKT"}
            </a>
          </div>
          <div className="text-lg font-bold text-[#FAB0EB]">
            <button
              type="button"
              onClick={() => {
                setActive([]);
                push(
                  query.slug
                    ? "/posts/" + String(query.slug).split(".sv")[0] + ".en"
                    : "/",
                  query.slug
                    ? "/posts/" + String(query.slug).split(".sv")[0] + ".en"
                    : "/",
                  {
                    locale: "en",
                    scroll: false,
                  }
                );
              }}
              className={clsx(
                locale === "en" ? "text-[#FAB0EB]" : "text-white"
              )}
              disabled={locale === "en"}
            >
              EN
            </button>{" "}
            |{" "}
            <button
              type="button"
              onClick={() => {
                setActive([]);
                push(
                  query.slug
                    ? "/posts/" + String(query.slug).split(".en")[0] + ".sv"
                    : "/",
                  query.slug
                    ? "/posts/" + String(query.slug).split(".en")[0] + ".sv"
                    : "/",
                  {
                    locale: "sv",
                    scroll: false,
                  }
                );
              }}
              className={clsx(
                locale === "sv" ? "text-[#FAB0EB]" : "text-white"
              )}
              disabled={locale === "sv"}
            >
              SV
            </button>
          </div>
        </div>
      </nav>
      {children}
      <nav
        className={clsx(
          route.includes("/posts/") && "hidden",
          "fixed bottom-5 z-20 flex w-full justify-center sm:hidden"
        )}
      >
        <div className="mx-auto flex w-full max-w-[15rem] items-center justify-between rounded-full bg-black bg-opacity-75 py-4 px-8 text-white backdrop-blur-sm xs:max-w-[20rem]">
          <Link href="/" scroll={false}>
            <HomeIcon
              className={clsx(
                route === "/" ? "text-[#FAB0EB]" : "text-white",
                "h-7 w-7 xs:h-9 xs:w-9"
              )}
            />
          </Link>
          <a href="#">
            <ChartBarSquareIcon
              className={clsx(
                route === "/dashboard" ? "text-[#FAB0EB]" : "text-white",
                "h-7 w-7 xs:h-9 xs:w-9"
              )}
            />
          </a>
          <a href="#">
            <RectangleStackIcon
              className={clsx(
                route === "/projects" ? "text-[#FAB0EB]" : "text-white",
                "h-7 w-7 xs:h-9 xs:w-9"
              )}
            />
          </a>
          <a href="#">
            <EnvelopeIcon
              className={clsx(
                route === "/contact" ? "text-[#FAB0EB]" : "text-white",
                "h-7 w-7 xs:h-9 xs:w-9"
              )}
            />
          </a>
        </div>
      </nav>
    </>
  );
}
