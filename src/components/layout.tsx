import {
  ChartBarSquareIcon,
  EnvelopeIcon,
  HomeIcon,
  RectangleStackIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

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

function Locale({
  setX,
  setWidth,
}: {
  setX: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
}) {
  const { push, query, locale } = useRouter();
  return (
    <>
      <div className="text-lg font-bold text-[#FAB0EB]">
        <button
          type="button"
          onClick={() => {
            setX(0);
            setWidth(4);
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
          className={clsx(locale === "en" ? "text-[#FAB0EB]" : "text-white")}
          disabled={locale === "en"}
        >
          EN
        </button>{" "}
        |{" "}
        <button
          type="button"
          onClick={() => {
            setX(0.05);
            setWidth(3.5);
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
          className={clsx(locale === "sv" ? "text-[#FAB0EB]" : "text-white")}
          disabled={locale === "sv"}
        >
          SV
        </button>
      </div>
    </>
  );
}

function Desktop() {
  const { route, locale } = useRouter();
  const [x, setX] = useState(locale === "en" ? 0 : 0.05);
  const [width, setWidth] = useState(locale === "en" ? 4 : 3.5);
  return (
    <nav className="sticky top-0 z-30 py-4 backdrop-blur-md">
      <div className="flex w-full items-center justify-between px-4 xs:px-6">
        <Link href="/" scroll={false}>
          <img src="/k.png" alt="brand logotype" className="h-6 w-6" />
        </Link>
        {locale === "en" ? (
          <div
            className={clsx(
              route.includes("/posts/") && "sm:hidden",
              "relative hidden space-x-12 text-lg font-semibold text-white sm:block"
            )}
            onMouseLeave={() => {
              setX(0);
              setWidth(4);
            }}
          >
            <div
              className="absolute top-[-0.2rem] left-[2.1rem] h-8 rounded-lg bg-[#AF7DE2] transition-all duration-150"
              style={{ width: width + "rem", translate: x + "rem" }}
            ></div>
            <Link
              href="/"
              className="relative"
              onMouseEnter={() => {
                setX(0);
                setWidth(4);
              }}
            >
              HOME
            </Link>
            <Link
              href="https://dashboard.ktra99.dev/"
              className="relative"
              onMouseEnter={() => {
                setX(5.15);
                setWidth(7);
              }}
            >
              DASHBOARD
            </Link>
            <Link
              href="#"
              className="relative"
              onMouseEnter={() => {
                setX(13.2);
                setWidth(6.5);
              }}
            >
              PROJECTS
            </Link>
            <Link
              href="#"
              className="relative"
              onMouseEnter={() => {
                setX(20.65);
                setWidth(6);
              }}
            >
              CONTACT
            </Link>
          </div>
        ) : (
          <div
            className={clsx(
              route.includes("/posts/") && "sm:hidden",
              "relative hidden space-x-12 text-lg font-semibold text-white sm:block"
            )}
            onMouseLeave={() => {
              setX(0.05);
              setWidth(3.5);
            }}
          >
            <div
              className="absolute top-[-0.2rem] left-[2.1rem] h-8 rounded-lg bg-[#AF7DE2] transition-all duration-150"
              style={{ width: width + "rem", translate: x + "rem" }}
            ></div>
            <Link
              href="/"
              className="relative"
              onMouseEnter={() => {
                setX(0.05);
                setWidth(3.5);
              }}
            >
              HEM
            </Link>
            <Link
              href="https://dashboard.ktra99.dev/"
              className="relative"
              onMouseEnter={() => {
                setX(4.65);
                setWidth(7);
              }}
            >
              DASHBOARD
            </Link>
            <Link
              href="#"
              className="relative"
              onMouseEnter={() => {
                setX(12.75);
                setWidth(5.75);
              }}
            >
              PROJEKT
            </Link>
            <Link
              href="#"
              className="relative"
              onMouseEnter={() => {
                setX(19.5);
                setWidth(6);
              }}
            >
              KONTAKT
            </Link>
          </div>
        )}
        <Locale setX={setX} setWidth={setWidth} />
      </div>
    </nav>
  );
}

function Mobile() {
  const { route } = useRouter();
  return (
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
  );
}

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <Desktop />
      {children}
      <Mobile />
    </>
  );
}
