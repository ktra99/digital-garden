import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Comments() {
  const { query } = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current?.children.length) return;
    const scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.crossOrigin = "anonymous";
    scriptElement.src = "https://utteranc.es/client.js";
    scriptElement.setAttribute("issue-term", "pathname");
    scriptElement.setAttribute("repo", "ktra99/digital-garden");
    scriptElement.setAttribute("theme", "github-dark");
    ref.current?.appendChild(scriptElement);
  }, [query]);
  return <div ref={ref} />;
}
