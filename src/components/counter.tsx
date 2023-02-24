import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Counter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(nodeRef);
  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current as { textContent: string };
      const controls = animate(from, to, {
        duration: 1,
        onUpdate(value) {
          node.textContent = value.toFixed(2);
        },
      });
      return () => controls.stop();
    }
  }, [from, to, isInView]);
  return <p ref={nodeRef} />;
}
