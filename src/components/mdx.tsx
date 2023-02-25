export function Code({ code }: { code: string }) {
  return (
    <code className="mx-2 rounded-md bg-white/20 px-1.5 py-1 text-base">
      {code}
    </code>
  );
}

export function Checkbox({
  header,
  excerpt,
}: {
  header: string;
  excerpt: string;
}) {
  return (
    <div className="relative flex items-start py-6">
      <div className="flex h-5 items-center">
        <input
          id="checkbox"
          aria-describedby="checkbox-description"
          name="checkbox"
          type="checkbox"
          className="h-6 w-6 rounded border-white/20 text-white/10 transition duration-300 focus:ring-white/10"
        />
      </div>
      <div className="ml-3 -mt-3">
        <label htmlFor="checkbox" className="font-medium text-white">
          {header}
        </label>
        <p id="checkbox-description" className="text-white/50">
          {excerpt}
        </p>
      </div>
    </div>
  );
}
