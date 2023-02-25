import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { consentAtom, denyAtom } from "@src/atoms";
import { variants } from "@src/data";
import useLocale from "@src/hooks/useLocale";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

interface ConsentParams {
  ad_storage?: "granted" | "denied" | undefined;
  analytics_storage?: "granted" | "denied" | undefined;
  wait_for_update?: number | undefined;
  region?: string[] | undefined;
  personalization_storage: "granted" | "denied" | undefined;
}

const TRACKING_ID = process.env.NEXT_PUBLIC_GA4_TRACKING_ID!;

export default function Consent() {
  const translate = useLocale();
  const [deny, setDeny] = useAtom(denyAtom);
  const [loading, setLoading] = useState(true);
  const [consent, setConsent] = useAtom(consentAtom);
  const acceptCookies = () => {
    setConsent(true);
    gtag("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
      personalization_storage: "denied",
    } as ConsentParams);
  };
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      <AnimatePresence>
        {!deny && !consent && !loading && (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-6 pb-6 font-sans"
          >
            <div className="pointer-events-auto mx-auto max-w-xl rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
              <p className="text-sm leading-6 text-gray-900">
                {translate(
                  "Hey there! I use cookies to provide you with a better browsing experience and to personalize content and ads. By clicking 'Accept,' you consent to my use of cookies. To learn more, please check out my privacy policy."
                )}
                <Link href="#">
                  <ArrowLongRightIcon className="ml-2 inline h-6 w-6" />
                </Link>
              </p>
              <div className="mt-4 flex items-center gap-x-5">
                <button
                  type="button"
                  onClick={acceptCookies}
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  {translate("Accept all")}
                </button>
                <button
                  type="button"
                  onClick={() => setDeny(true)}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {translate("Reject all")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent','default',{
              'ad_storage':'denied',
              'analytics_storage':'denied',
              'personalization_storage':'denied'
            });
            gtag("set", "ads_data_redaction", true);
            gtag('config', '${TRACKING_ID}');`,
        }}
      ></Script>
      {consent && (
        <Script
          id="gtag-update"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            gtag('consent','update',{
              'ad_storage':'granted',
              'analytics_storage':'granted',
              'personalization_storage':'granted'
            });`,
          }}
        ></Script>
      )}
    </>
  );
}
