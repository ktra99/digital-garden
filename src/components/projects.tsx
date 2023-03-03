import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { projects } from "@src/data";
import useLocale from "@src/hooks/useLocale";
import type MouseFollower from "mouse-follower";

export default function Projects({ cursor }: { cursor: MouseFollower | null }) {
  const translate = useLocale();
  return (
    <div className="relative mx-auto my-24 w-full px-4">
      <div className="divide-y divide-white">
        <h2 className="text-4xl font-bold leading-10 tracking-tight text-white">
          {translate("Projects")}
        </h2>
        <div className="mt-10 space-y-6 divide-y divide-white">
          {projects.map((project) => (
            <div
              key={project.href}
              className="pt-6"
              onMouseEnter={() => cursor?.setImg(project.image)}
              onMouseLeave={() => cursor?.removeImg()}
            >
              <div className="relative flex w-full items-start justify-between text-left text-white">
                <span className="font-semibold leading-7 sm:text-xl">
                  {project.name}
                </span>
                <a
                  href={project.href}
                  aria-label={project.name}
                  className="absolute inset-0 z-20 flex h-7 items-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ArrowTopRightOnSquareIcon className="ml-auto h-6 w-6" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <span id="projects" className="absolute -top-20"></span>
    </div>
  );
}
