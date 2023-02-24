import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const TRACKING_ID = process.env.NEXT_PUBLIC_GA4_TRACKING_ID!;

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-zinc-900">
        <Main />
        <NextScript />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer ||[];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('consent','default',{
              'ad_storage':'denied',
              'analytics_storage':'denied',
              'personalization_storage':'denied'
            });
            gtag("set", "ads_data_redaction", true);`,
          }}
        ></Script>
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${TRACKING_ID}');`,
          }}
        ></Script>
      </body>
    </Html>
  );
}
