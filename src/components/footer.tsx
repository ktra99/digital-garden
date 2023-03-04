import GitHubButton from "react-github-btn";
import useLocale from "@src/hooks/useLocale";

export function Page() {
  const translate = useLocale();
  return (
    <footer className="mx-auto my-4 px-4 sm:max-w-[33rem] sm:px-0 xl:max-w-7xl">
      <hr />
      <div className="mt-4 mb-24 flex items-center justify-between xs:mb-32 sm:mt-6">
        <mark className="block bg-transparent font-semibold text-white xs:text-lg">
          © {new Date().getFullYear() + " Kenny Tran."} {""}
          {translate("All rights reserved.")}
        </mark>
        <GitHubButton
          href="https://github.com/ktra99/digital-garden"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star ktra99/digital-garden on GitHub"
        >
          Star
        </GitHubButton>
      </div>
    </footer>
  );
}

export function Post() {
  const translate = useLocale();
  return (
    <footer className="mx-auto mb-4 max-w-3xl px-4 font-semibold text-white xs:mt-4 xs:mb-16 xs:text-lg">
      <div className="flex items-center justify-between">
        <mark className="bg-transparent text-white">
          © {new Date().getFullYear() + " Kenny Tran."} {""}
          {translate("All rights reserved.")}
        </mark>
        <GitHubButton
          href="https://github.com/ktra99/digital-garden"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star ktra99/digital-garden on GitHub"
        >
          Star
        </GitHubButton>
      </div>
    </footer>
  );
}
