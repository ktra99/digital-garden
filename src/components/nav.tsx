import {
  ChartBarSquareIcon,
  EnvelopeIcon,
  HomeIcon,
  RectangleStackIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, ReactNode, SetStateAction } from "react";

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
    href: "#projects",
  },
  {
    icon: EnvelopeIcon,
    href: "mailto:kennytran.dev@outlook.com",
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

function Desktop({
  setX,
  setWidth,
}: {
  setX: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
}) {
  return (
    <nav className="sticky top-0 z-30 bg-[#5A64DE] bg-opacity-60 py-3 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between px-4">
        <Link href="/" scroll={false}>
          <img src="/k.png" alt="brand logotype" className="h-6 w-6" />
        </Link>
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
        "fixed bottom-5 z-20 flex w-full justify-center md:hidden"
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

export default function Nav({
  setX,
  setWidth,
  children,
}: {
  setX: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
  children?: ReactNode;
}) {
  return (
    <>
      <Desktop setX={setX} setWidth={setWidth} />
      {children}
      <Mobile />
    </>
  );
}
