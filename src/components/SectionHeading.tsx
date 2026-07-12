export default function SectionHeading({
  index,
  code,
  title,
  sub,
}: {
  index: string;
  code: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10">
      <div className="mb-2 flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.2em] text-amber">
          SEC.{index} <span className="text-mute">//</span> {code}
        </span>
        <span className="h-px flex-1 bg-line" aria-hidden />
      </div>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {sub && <p className="mt-2 max-w-2xl text-sm text-mute">{sub}</p>}
    </div>
  );
}
