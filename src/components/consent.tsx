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
        {!deny && !consent && !loading ? (
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
        ) : (
          <motion.button
            type="button"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <svg
              width={42}
              height={42}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fixed bottom-10 right-10"
            >
              <path
                d="M20.966 41.833C9.484 41.82.18 32.501.166 21c.82.232 1.666.35 2.517.352a8.544 8.544 0 0 0 7.072-3.66 7.586 7.586 0 0 0 .811-7.109c.598.107 1.203.161 1.81.163a8.87 8.87 0 0 0 6.957-3.288A8.68 8.68 0 0 0 21.101.167c11.488.037 20.77 9.395 20.732 20.9-.037 11.506-9.38 20.803-20.867 20.766Zm1.587-7.15c.32.138.665.209 1.013.208a2.602 2.602 0 0 0 2.401-1.607 2.61 2.61 0 0 0-.56-2.838 2.61 2.61 0 0 0-1.84-.763 2.605 2.605 0 0 0-1.013 5ZM10.4 31.156a3.467 3.467 0 0 0 4.522-1.896 3.477 3.477 0 0 0-.776-3.791 3.462 3.462 0 0 0-2.431-.998 3.472 3.472 0 0 0-3.466 3.473c0 1.393.83 2.652 2.11 3.2h.033l.008.012Zm19.616-5.223a3.462 3.462 0 0 0 3.992-.964 3.475 3.475 0 0 0-.712-5.11 3.463 3.463 0 0 0-3.608-.167 3.474 3.474 0 0 0 .166 6.174h-.025l.062.028.042.016h-.013c.03.01.06.02.088.034l.008-.01Zm-9.05-8.406a1.738 1.738 0 0 0-.66 3.346c.769.314 1.651.04 2.107-.654a1.74 1.74 0 0 0-.773-2.555l-.037-.016-.056-.021a1.716 1.716 0 0 0-.58-.1Zm7.8-8.68a2.593 2.593 0 0 0-2.584 2.33 2.591 2.591 0 0 0 5.051 1.041 2.597 2.597 0 0 0-1.456-3.162h-.021a2.586 2.586 0 0 0-.99-.208Zm-23.4 6.944a1.734 1.734 0 0 1-1.732-1.735 1.734 1.734 0 1 1 3.465 0 1.736 1.736 0 0 1-1.732 1.736Zm-2.6-5.208a2.602 2.602 0 0 1-2.6-2.604 2.602 2.602 0 0 1 2.6-2.604c1.437 0 2.6 1.166 2.6 2.604a2.606 2.606 0 0 1-2.6 2.604Zm10.4-3.473a2.602 2.602 0 0 1-2.6-2.604 2.602 2.602 0 0 1 2.6-2.604c1.436 0 2.6 1.166 2.6 2.604a2.604 2.604 0 0 1-2.6 2.606V7.11ZM7.101 3.64A1.734 1.734 0 0 1 5.37 1.905c0-.958.774-1.736 1.73-1.736a1.736 1.736 0 0 1 .001 3.47Z"
                fill="#FFF"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
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
          id="google-analytics"
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
