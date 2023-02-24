import "@src/styles/cursor.scss";
import "@src/styles/dracula.css";
import "@src/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

const Consent = dynamic(() => import("@src/components/consent"), {
  ssr: false,
});

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
      <Analytics />
      <Consent />
    </>
  );
}
