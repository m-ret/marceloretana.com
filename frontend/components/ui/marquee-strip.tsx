export function MarqueeStrip() {
  return (
    <div className="overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {["set-1", "set-2", "set-3", "set-4"].map((id) => (
          <div key={id} className="flex">
            <span className="px-8 py-4 text-sm font-bold uppercase tracking-wider bg-yellow-400 text-black">
              Building The Future
            </span>
            <span className="px-8 py-4 text-sm font-bold uppercase tracking-wider bg-cyan-500 text-black">
              Crafting Experiences
            </span>
            <span className="px-8 py-4 text-sm font-bold uppercase tracking-wider bg-rose-500 text-white">
              Solving Problems
            </span>
            <span className="px-8 py-4 text-sm font-bold uppercase tracking-wider bg-violet-500 text-white">
              Creating Impact
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
