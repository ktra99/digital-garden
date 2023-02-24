import Counter from "@src/components/counter";
import { projects } from "@src/data";
import useLocale from "@src/hooks/useLocale";
import { PostMeta } from "@src/types";

export default function Stats({ posts }: { posts: PostMeta[] }) {
  const translate = useLocale();
  const stats = [
    { id: 1, name: translate("Posts"), value: posts.length / 2 },
    { id: 2, name: translate("Projects"), value: projects.length },
    { id: 3, name: translate("Subscribers"), value: 0 },
  ];
  return (
    <div className="relative my-24 px-4">
      <dl className="flex flex-col items-center gap-y-16 gap-x-8 text-center sm:flex-row sm:justify-between">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col gap-y-4">
            <dt className="text-base leading-7 text-white">{stat.name}</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              <Counter to={stat.value} from={0} />
            </dd>
          </div>
        ))}
      </dl>
      <span id="stats" className="absolute -top-20"></span>
    </div>
  );
}
