type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  light = false,
}: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2
        className={`type-display text-3xl sm:text-4xl md:text-[2.75rem] ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/70" : "text-slate"
          }`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
