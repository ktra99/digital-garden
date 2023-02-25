import { widthAtom, xAtom } from "@src/atoms";
import { nav, navigation } from "@src/data";
import useLocale from "@src/hooks/useLocale";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { variants } from "@src/data";

export function Desktop() {
  const translate = useLocale();
  const { locale } = useRouter();
  const [x, setX] = useAtom(xAtom);
  const [width, setWidth] = useAtom(widthAtom);
  const coordinates = nav[locale as keyof {}] as { x: number; width: number }[];
  return (
    <nav className="-ml-9 hidden w-full items-center justify-between md:mt-12 md:flex xl:mt-24">
      <div
        className="relative space-x-12 text-lg font-semibold text-white"
        onMouseLeave={() => {
          setX(coordinates[0].x);
          setWidth(coordinates[0].width);
        }}
      >
        <div
          className="absolute top-[-0.2rem] left-[2.1rem] h-8 rounded-md bg-white/10 transition-all duration-150"
          style={{ width: width + "rem", translate: x + "rem" }}
        ></div>
        {navigation.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="relative uppercase"
            onMouseEnter={() => {
              setX(coordinates[index].x);
              setWidth(coordinates[index].width);
            }}
          >
            {translate(item.name)}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Mobile() {
  return (
    <motion.nav
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed bottom-5 z-20 flex w-full justify-center md:hidden"
    >
      <div className="mx-auto flex w-full max-w-[15rem] items-center justify-between rounded-md border border-white/30 bg-white/25 bg-opacity-90 py-4 px-8 backdrop-blur-md xs:max-w-[20rem]">
        {navigation.map((item, index) => (
          <Link key={index} href={item.href} aria-label={item.href}>
            <item.icon className="h-7 w-7 text-white/80 transition duration-300 xs:h-9 xs:w-9" />
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
