import "@src/styles/cursor.scss";
import "@src/styles/dracula.css";
import "@src/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const Consent = dynamic(() => import("@src/components/consent"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <Consent />
    </>
  );
}
