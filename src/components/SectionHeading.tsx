export default function SectionHeading({
  icon,
  title,
  sub,
}: {
  icon: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3">
        <span
          className="grad-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg text-white shadow-md shadow-indigo-500/30"
          aria-hidden
        >
          {icon}
        </span>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {sub && <p className="mt-3 max-w-2xl text-sm text-mute sm:text-base">{sub}</p>}
    </div>
  );
}
