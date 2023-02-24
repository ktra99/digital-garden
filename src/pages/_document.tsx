import { Html, Head, Main, NextScript } from "next/document";

const TRACKING_ID = process.env.NEXT_PUBLIC_GA4_TRACKING_ID!;

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
      <body className="bg-zinc-900">
        <Main />
        <NextScript />
        <script
          src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent','default',{
              'ad_storage':'denied',
              'analytics_storage':'denied',
              'personalization_storage':'denied'
            });
            gtag('config', '${TRACKING_ID}');
            gtag("set", "ads_data_redaction", true);
          `,
          }}
        />
      </body>
    </Html>
  );
}
