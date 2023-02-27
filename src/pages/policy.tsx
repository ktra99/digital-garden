import Navbar from "@src/components/navbar";
import { motion } from "framer-motion";
import { pageVariants } from "@src/data";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { Post as PostFooter } from "@src/components/footer";
import useLocale from "@src/hooks/useLocale";

export default function Policy() {
  const translate = useLocale();
  return (
    <>
      <Navbar posts={[]} />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="mx-auto flex max-w-3xl flex-col justify-center p-4">
          <Link
            href="/"
            aria-label="back"
            className="group mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition duration-300 hover:border-white"
          >
            <ArrowLongLeftIcon className="h-6 w-6 text-white/40 transition duration-300 group-hover:text-white" />
          </Link>
          <h1 className="my-6 text-[1.75rem] font-bold leading-[2.5rem] text-white xs:my-12 xs:text-5xl xs:leading-[4rem]">
            {translate("Privacy policy")}
          </h1>
          <div id="mdx" className="w-full space-y-6 font-sans text-white">
            <p>
              {translate(
                "Welcome to my website! I take your privacy seriously and want to be transparent about how I use cookies."
              )}
            </p>
            <p>
              {translate(
                "This privacy policy explains how I use cookies on my website and what options you have to accept or deny them."
              )}
            </p>
            <h2>{translate("What are cookies?")}</h2>
            <p>
              {translate(
                "Cookies are small text files that are stored on your device when you visit a website. They are used to remember your preferences and provide a better user experience. There are different types of cookies, such as session cookies that are deleted when you close your browser, and persistent cookies that are stored on your device until they expire or you delete them."
              )}
            </p>
            <h2>{translate("What cookies do I use?")}</h2>
            <p>
              {translate(
                "I use different types of cookies on my website for various purposes, such as:"
              )}
            </p>
            <ul>
              <li>
                {translate(
                  "Essential cookies: These cookies are necessary for the website to function properly and cannot be turned off."
                )}
              </li>
              <li>
                {translate(
                  "Analytics cookies: These cookies help me understand how visitors interact with my website by collecting information such as the pages visited, the time spent on the website, and the devices used. I use this information to improve my website and provide a better user experience."
                )}
              </li>
              <li>
                {translate(
                  "Marketing cookies: These cookies are used to personalize the ads that you see on my website and other websites. They may be used by my advertising partners to show you relevant ads based on your interests."
                )}
              </li>
            </ul>
            <h2>{translate("How to manage cookies?")}</h2>
            <p>
              {translate(
                "You have the option to accept or deny cookies on my website. When you first visit my website, you will be asked to choose your cookie preferences. If you accept cookies, I will store them on your device. If you deny cookies, I will only use essential cookies that are necessary for the website to function properly."
              )}
            </p>
            <p>
              {translate(
                "You can change your cookie preferences at any time by clicking on the cookie icon on the top left of our website. You can also delete cookies from your device using your browser settings."
              )}
            </p>
            <p>
              {translate(
                "Please note that denying cookies may affect the functionality of my website and some features may not work properly. I hope this privacy policy has provided you with a clear understanding of how I use cookies on my website. If you have any questions or concerns, please contact me at kennytran.dev@outlook.com."
              )}
            </p>
            <hr />
          </div>
        </div>
      </motion.main>
      <PostFooter />
    </>
  );
}
