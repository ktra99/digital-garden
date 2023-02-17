import GoogleAnalytics from "@src/components/g4a";
import Layout from "@src/components/layout";
import "@src/styles/dracula.css";
import "@src/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [active, setActive] = useState<string[]>([]);
  return (
    <>
      <GoogleAnalytics />
      <Layout>
        <Component {...pageProps} active={active} setActive={setActive} />
      </Layout>
      <Analytics />
    </>
  );
}
