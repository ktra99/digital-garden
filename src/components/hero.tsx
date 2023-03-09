import Avatar from "@public/avatar.png";
import Header from "@src/components/header";
import { Desktop as DesktopTags } from "@src/components/tags";
import { PostMeta } from "@src/types";
import Image from "next/image";

export function Tablet({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="order-0 flex flex-col xl:order-1">
      <div className="relative mx-auto hidden h-96 w-96 rounded-full bg-white/5 ring-1 ring-white/10 sm:block xl:ml-auto">
        <Image src={Avatar} alt="avatar" placeholder="blur" priority fill />
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
