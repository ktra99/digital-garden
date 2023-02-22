import GoogleAnalytics from "@src/components/g4a";
import Nav from "@src/components/nav";
import "@src/styles/dracula.css";
import "@src/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const [x, setX] = useState(locale === "en" ? 0 : 0.05);
  const [width, setWidth] = useState(locale === "en" ? 4 : 3.5);
  return (
    <>
      <GoogleAnalytics />
      <Nav setX={setX} setWidth={setWidth}>
        <Component
          {...pageProps}
          x={x}
          setX={setX}
          width={width}
          setWidth={setWidth}
        />
      </Nav>
      <Analytics />
    </>
  );
}
