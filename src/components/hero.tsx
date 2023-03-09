import Avatar from "@public/avatar.png";
import Header from "@src/components/header";
import { Desktop as DesktopTags } from "@src/components/tags";
import { PostMeta } from "@src/types";
import Image from "next/image";

export function Tablet({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="order-0 flex flex-col xl:order-1">
      <div className="relative mx-auto mt-4 h-64 w-64 rounded-full bg-white/5 ring-1 ring-white/10 sm:mt-0 sm:h-96 sm:w-96 xl:ml-auto">
        <Image src={Avatar} alt="avatar" placeholder="blur" priority fill />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 187.568 118.302"
          width={375.136}
          height={236.605}
          filter="invert(93%) hue-rotate(180deg)"
          className="absolute -top-20 -right-10 w-36 sm:w-48"
        >
          <defs>
            <style>
              {
                '@font-face{font-family:"Virgil";src:url(https://excalidraw.com/Virgil.woff2)}@font-face{font-family:"Cascadia";src:url(https://excalidraw.com/Cascadia.woff2)}'
              }
            </style>
          </defs>
          <text
            fontFamily="Virgil, Segoe UI Emoji"
            fontSize={20}
            style={{
              whiteSpace: "pre",
            }}
            dominantBaseline="text-before-edge"
            transform="translate(10 37.077)"
          >
            {"That's me"}
          </text>
          <g strokeLinecap="round">
            <path
              d="M109.155 9.996c11.52 7.96 72.14 33.28 68.23 49.5-3.9 16.22-76.59 39.64-91.66 47.84m21.85-95.1c11.55 8.57 72.72 32.16 69.46 48.17-3.26 16.01-74.05 40.21-89.01 47.9"
              stroke="#000"
              fill="none"
            />
            <path
              d="M108.745 89.736c-5.15.39-8.82 6.7-19.54 16.8m20.79-19.66c-4.63 5.87-9.55 9.55-21.5 20.94"
              stroke="#000"
              fill="none"
            />
            <path
              d="M116.765 108.616c-6.98-3.53-12.3-1.15-27.56-2.08m28.82-.77c-6.25 1.72-12.96 1.18-29.53 2.05"
              stroke="#000"
              fill="none"
            />
          </g>
        </svg>
      </div>
      <div className="hidden sm:mt-12 sm:block xl:hidden">
        <Header />
      </div>
      <DesktopTags posts={posts} />
    </div>
  );
}

export function Hero() {
  return (
    <div className="block sm:mt-12 sm:hidden xl:block">
      <Header />
    </div>
  );
}
