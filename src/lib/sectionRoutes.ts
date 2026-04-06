export const SECTION_IDS = ["home", "skills", "projects", "achievements", "contact"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const PATH_BY_SECTION: Record<SectionId, string> = {
  home: "/",
  skills: "/skills",
  projects: "/projects",
  achievements: "/achievements",
  contact: "/contact",
};

const SECTION_BY_PATH = new Map(
  Object.entries(PATH_BY_SECTION).map(([id, path]) => [path, id as SectionId]),
);

export function sectionFromPath(pathname: string): SectionId | null {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return SECTION_BY_PATH.get(normalized) ?? null;
}
