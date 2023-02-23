export default function Code({ code }: { code: string }) {
  return (
    <code className="mx-2 rounded-md bg-white/20 px-1.5 py-1 text-base">
      {code}
    </code>
  );
}
