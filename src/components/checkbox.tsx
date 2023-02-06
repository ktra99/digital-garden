export default function Checkbox({
  header,
  excerpt,
}: {
  header: string;
  excerpt: string;
}) {
  return (
    <div className="relative my-6 flex items-start">
      <div className="flex h-5 items-center">
        <input
          id="checkbox"
          aria-describedby="checkbox-description"
          name="checkbox"
          type="checkbox"
          className="h-6 w-6 rounded border-gray-300 text-[#3F49C2] transition duration-300 focus:ring-[#3F49C2]"
        />
      </div>
      <div className="ml-3 -mt-3">
        <label htmlFor="checkbox" className="font-medium text-white">
          {header}
        </label>
        <p id="checkbox-description" className="text-[#FAB0EB]">
          {excerpt}
        </p>
      </div>
    </div>
  );
}
