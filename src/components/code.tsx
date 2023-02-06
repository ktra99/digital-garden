export default function Code({ code }: { code: string }) {
  return (
    <code className="mx-1 rounded-md bg-[#3F49C2] px-1.5 py-1 text-base">
      {code}
    </code>
  );
}
