import { cn } from "@/lib/cn";

export type SkillName =
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "React"
  | "Next.js"
  | "Vercel"
  | "jQuery"
  | "Laravel"
  | "PHP"
  | "MySQL"
  | "MongoDB"
  | "Firebase"
  | "Railway";

export function SkillIcon({
  name,
  className,
}: {
  name: SkillName;
  className?: string;
}) {
  const s = "fill-none stroke-current stroke-[1.6]";

  if (name === "React") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
        <circle cx="12" cy="12" r="1.6" className="fill-current stroke-none" />
        <ellipse cx="12" cy="12" rx="8" ry="3.5" className={s} />
        <ellipse cx="12" cy="12" rx="8" ry="3.5" className={cn(s, "rotate-60 origin-center")} />
        <ellipse cx="12" cy="12" rx="8" ry="3.5" className={cn(s, "-rotate-60 origin-center")} />
      </svg>
    );
  }

  if (name === "Next.js") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
        <path
          className={s}
          d="M7 18V6l10 12V6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "Vercel") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
        <path className="fill-current" d="M12 6 20 18H4L12 6z" />
      </svg>
    );
  }

  if (name === "JavaScript") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
        <path className={s} d="M9 7v9a2 2 0 0 1-4 0" strokeLinecap="round" />
        <path
          className={s}
          d="M14 17c.3 1.2 1.2 2 2.5 2 1.2 0 2.5-.6 2.5-2 0-2-4.6-1.6-4.6-4.6 0-1.7 1.4-2.8 3-2.8 1.2 0 2.2.5 2.7 1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "HTML") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
        <path className={s} d="M6 4h12l-1 14-5 2-5-2-1-14z" strokeLinejoin="round" />
        <path className={s} d="M9 8h6M9 12h6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "CSS") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
        <path className={s} d="M6 4h12l-1 14-5 2-5-2-1-14z" strokeLinejoin="round" />
        <path
          className={s}
          d="M9 8h7M9 12h6M9 16h5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "MongoDB") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
        <path
          className={s}
          d="M12 3c3.5 3 5.5 6.5 5 10.2-.5 3.9-3.2 6.9-5 7.8-1.8-.9-4.5-3.9-5-7.8C6.5 9.5 8.5 6 12 3z"
          strokeLinejoin="round"
        />
        <path className={s} d="M12 5v16" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "Firebase") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
        <path className={s} d="M7 20 12 4l5 16-5 2-5-2z" strokeLinejoin="round" />
        <path className={s} d="M9 14h6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "Laravel") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
        <path
          className={s}
          d="M4.5 8.5 10 5.4l5.5 3.1v6.2L10 17.8 4.5 14.7V8.5z"
          strokeLinejoin="round"
        />
        <path className={s} d="M15.5 8.5 21 5.4v6.2l-5.5 3.1" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "PHP") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
        <path className={s} d="M5 9h7a3 3 0 0 1 0 6H5V9z" strokeLinejoin="round" />
        <path className={s} d="M14 9h5v6h-5" strokeLinejoin="round" />
        <path className={s} d="M7 12h3" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "MySQL") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
        <path
          className={s}
          d="M5 9c2-2 5-3 8-3s6 1 6 3-3 3-6 3-6-1-8-3z"
          strokeLinejoin="round"
        />
        <path
          className={s}
          d="M5 9v6c0 2 3 3 8 3s6-1 6-3V9"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "Railway") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
        <path className={s} d="M7 3h10v12a5 5 0 0 1-10 0V3z" strokeLinejoin="round" />
        <path className={s} d="M8 17h8" strokeLinecap="round" />
        <path className={s} d="M9 21h6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden="true">
      <path
        className={s}
        d="M6 10h12M8 14h8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
