import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import useLocale from "@src/hooks/useLocale";

export default function Newsletter() {
  const translate = useLocale();
  return (
    <div className="relative isolate my-36 mx-auto overflow-hidden px-4">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 xl:max-w-none xl:grid-cols-2">
        <div className="max-w-xl xl:max-w-lg">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {translate("Subscribe to my newsletter.")}
          </h2>
          <p className="mt-4 text-lg leading-8 text-white">
            {translate("Don't miss out on exclusive content and updates!")}
          </p>
          <div className="mt-6 flex max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              {translate("Email address")}
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-md border border-white/10 bg-white/5 px-3.5 py-2 text-white placeholder-white shadow-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder={translate("Enter your email")}
            />
            <button
              type="submit"
              className="flex-none rounded-md border-2 border-transparent bg-white/5 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/10"
              disabled
            >
              {translate("Subscribe")}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
          <div className="flex flex-col items-start">
            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
              <CalendarDaysIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <h2 className="mt-4 font-semibold text-white">
              {translate("Weekly articles")}
            </h2>
            <p className="mt-2 leading-7 text-white">
              {translate("Stay informed and inspired every week!")}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
              <HandRaisedIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <h2 className="mt-4 font-semibold text-white">
              {translate("No spam")}
            </h2>
            <p className="mt-2 leading-7 text-white">
              {translate(
                "I'll never share your information or spam your inbox."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
