interface FlipUnitProps {
  value: number;
  label: string;
  pad?: number;
}

export function FlipUnit({ value, label, pad = 2 }: FlipUnitProps) {
  const display = String(value).padStart(pad, "0");
  return (
    <div className="flex flex-col items-center">
      <div
        className="
          rounded-2xl
          bg-zinc-900/90
          ring-1 ring-white/10
          shadow-2xl shadow-black/60
          px-5 py-6
          sm:px-7 sm:py-8
          min-w-[5.5rem] sm:min-w-[7rem] md:min-w-[8.5rem]
          text-center
        "
      >
        <span
          className="
            block
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            font-black
            text-white
            tabular-nums
            tracking-tight
            leading-none
          "
        >
          {display}
        </span>
      </div>
      <span className="mt-3 text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold">
        {label}
      </span>
    </div>
  );
}
