import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html>
      <Head />
      <script
        defer
        src="https://unpkg.com/@tinybirdco/flock.js"
        data-host="https://api.tinybird.co"
        data-token="p.eyJ1IjogIjBkYTk2NzgyLTFhNDYtNGI4OC1iZDNiLTcwZTg2Y2E5M2IzMyIsICJpZCI6ICJkMTJmZDQwYS00N2RhLTQzMGItODY1Ny1kOWI3NGNlOTM1MGEifQ.DBqMM9is_hoQwUz-yHUUzx2Effwk-T07lselNt8XA20"
      />
      <body>
        <Main />
        <NextScript />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        {/* Necessary to prevent error: window.gtag is not defined for Next.js-hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
          }}
        />
      </body>
    </Html>
  );
}
