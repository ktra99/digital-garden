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
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
  const { push, query, route, locale } = useRouter();
  const mobileNavigation = [
    {
      icon: HomeIcon,
      href: "/",
    },
    {
      icon: ChartBarSquareIcon,
      href: "http://dashboard.ktra99.dev/",
    },
    {
      icon: RectangleStackIcon,
      href: "#",
    },
    {
      icon: EnvelopeIcon,
      href: "#",
    },
  ];
  const desktopNavigation = [
    {
      name: locale === "en" ? "HOME" : "HEM",
      href: "/",
    },
    {
      name: locale === "en" ? "DASHBOARD" : "DASHBOARD",
      href: "http://dashboard.ktra99.dev/",
    },
    {
      name: locale === "en" ? "PROJECTS" : "PROJEKT",
      href: "#",
    },
    {
      name: locale === "en" ? "CONTACT" : "KONTAKT",
      href: "#",
    },
  ];
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
            {desktopNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  route === item.href && "border-b-2 border-[#FAB0EB]",
                  "py-1"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="text-lg font-bold text-[#FAB0EB]">
            <button
              type="button"
              onClick={() =>
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
                )
              }
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
              onClick={() =>
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
                )
              }
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
          {mobileNavigation.map((item, index) => (
            <Link key={index} href={item.href} scroll={false}>
              <item.icon
                className={clsx(
                  route === item.href ? "text-[#FAB0EB]" : "text-white",
                  "h-7 w-7 xs:h-9 xs:w-9"
                )}
              />
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
