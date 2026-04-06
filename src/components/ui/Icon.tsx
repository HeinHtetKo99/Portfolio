import { cn } from "@/lib/cn";

export function Icon({
  name,
  className,
}: {
  name:
    | "arrow-down"
    | "arrow-right"
    | "mail"
    | "github"
    | "linkedin"
    | "sun"
    | "moon";
  className?: string;
}) {
  const common = "fill-none stroke-current stroke-[1.6]";
  const base = "h-5 w-5 transition-transform duration-200 motion-reduce:transition-none";

  if (name === "arrow-down") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn(base, "group-hover:translate-y-0.5", className)}
        aria-hidden="true"
      >
        <path className={common} d="M12 5v14" />
        <path className={common} d="m6 13 6 6 6-6" />
      </svg>
    );
  }

  if (name === "arrow-right") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn(base, "group-hover:translate-x-0.5", className)}
        aria-hidden="true"
      >
        <path className={common} d="M5 12h14" />
        <path className={common} d="m13 6 6 6-6 6" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn(base, "group-hover:-translate-y-0.5 group-hover:scale-[1.02]", className)}
        aria-hidden="true"
      >
        <path className={common} d="M4 6h16v12H4z" />
        <path className={common} d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn(base, "group-hover:-translate-y-0.5 group-hover:scale-[1.02]", className)}
        aria-hidden="true"
      >
        <path
          className={common}
          d="M9 19c-4 1.5-4-2.5-5-3m10 5v-3.2c0-.9.3-1.6.8-2-2.7-.3-5.6-1.3-5.6-6A4.7 4.7 0 0 1 9.5 7a4.4 4.4 0 0 1 .1-3s1-.3 3.4 1.3a11.5 11.5 0 0 1 6.2 0C21.6 3.7 22.6 4 22.6 4a4.4 4.4 0 0 1 .1 3 4.7 4.7 0 0 1 1.2 3.3c0 4.7-2.9 5.7-5.6 6 .5.4.9 1.2.9 2.4V21"
        />
      </svg>
    );
  }

  if (name === "sun") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn(base, "group-hover:rotate-6", className)}
        aria-hidden="true"
      >
        <path className={common} d="M12 3v2.2" />
        <path className={common} d="M12 18.8V21" />
        <path className={common} d="M4.2 12H3" />
        <path className={common} d="M21 12h-1.2" />
        <path className={common} d="m6 6 1.6 1.6" />
        <path className={common} d="m16.4 16.4 1.6 1.6" />
        <path className={common} d="m18 6-1.6 1.6" />
        <path className={common} d="m7.6 16.4-1.6 1.6" />
        <path className={common} d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      </svg>
    );
  }

  if (name === "moon") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn(base, "group-hover:-rotate-6", className)}
        aria-hidden="true"
      >
        <path
          className={common}
          d="M21 15.2A7.7 7.7 0 0 1 9.2 3.4a6.9 6.9 0 1 0 11.8 11.8z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true">
      <path
        className={common}
        d="M6.5 8.5V19h3.2v-6.2c0-1.6.3-3.1 2.3-3.1s2 1.8 2 3.2V19H19V12.1c0-3.4-1.8-5-4.3-5-1.2 0-2.5.7-3 1.7V8.5H6.5z"
      />
      <path className={common} d="M5 19V8.5h3.2V19H5z" />
      <path className={common} d="M6.6 5.7a1.6 1.6 0 1 1 0 .1z" />
    </svg>
  );
}
