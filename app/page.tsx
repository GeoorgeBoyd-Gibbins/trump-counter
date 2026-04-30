import { Countdown } from "@/components/Countdown";
import { END_INSTANT_MS, HEADLINE, SUBLINE } from "@/lib/constants";
import { diffToParts } from "@/lib/time";

export default function Home() {
  const initial = diffToParts(END_INSTANT_MS, Date.now());

  return (
    <main
      className="
        relative flex flex-1 flex-col items-center justify-center
        overflow-hidden
        bg-[radial-gradient(ellipse_at_top,_#1a1a1a_0%,_#000_60%)]
        text-white
        px-4 py-16 sm:py-24
      "
    >
      {/* subtle grid backdrop */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
          bg-[size:48px_48px]
          [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]
        "
      />

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 max-w-5xl w-full">
        <header className="text-center flex flex-col gap-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
            {HEADLINE}
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 tracking-wide">
            {SUBLINE}
          </p>
        </header>

        <Countdown initial={initial} targetMs={END_INSTANT_MS} />
      </div>
    </main>
  );
}
