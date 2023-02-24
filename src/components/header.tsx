import useLocale from "@src/hooks/useLocale";

export default function Header() {
  const translate = useLocale();
  return (
    <header className="space-y-3">
      <h2 className="text-4xl font-bold uppercase text-white xs:text-6xl sm:text-8xl">
        Kenny Tran
      </h2>
      <div className="sm:w-[33rem]">
        <p className="text-lg leading-8 text-white">
          {translate(
            "Hey, I'm Kenny. I'm a developer based in Sweden. My strength lies in developing user friendly applications, with complex data and API integrations."
          )}
        </p>
      </div>
    </header>
  );
}
