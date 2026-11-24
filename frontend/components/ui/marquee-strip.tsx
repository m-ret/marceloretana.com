const copies = ["set-1", "set-2", "set-3", "set-4"];

export function MarqueeStrip() {
  return (
    <div className="overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {copies.map((id, index) => (
          // The strip repeats its phrases so the scroll can loop; only the first copy is for
          // assistive technology, so the words are not read four times.
          <div key={id} className="flex" aria-hidden={index > 0 ? true : undefined}>
            <span className="px-8 py-4 text-sm font-bold uppercase tracking-wider bg-yellow-400 text-black">
              Building The Future
            </span>
            <span className="px-8 py-4 text-sm font-bold uppercase tracking-wider bg-cyan-500 text-black">
              Crafting Experiences
            </span>
            <span className="px-8 py-4 text-sm font-bold uppercase tracking-wider bg-rose-600 text-white">
              Solving Problems
            </span>
            <span className="px-8 py-4 text-sm font-bold uppercase tracking-wider bg-violet-600 text-white">
              Creating Impact
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
