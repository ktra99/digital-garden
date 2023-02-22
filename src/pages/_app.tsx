import GoogleAnalytics from "@src/components/g4a";
import Nav from "@src/components/nav";
import "@src/styles/dracula.css";
import "@src/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics />
      <Nav>
        <Component {...pageProps} />
      </Nav>
      <Analytics />
    </>
  );
}
