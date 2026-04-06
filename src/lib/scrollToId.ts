export function getScrollOffsetPx() {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  if (!header) return 96;
  const rect = header.getBoundingClientRect();
  return Math.max(0, Math.round(rect.height + 12));
}

export function scrollToId(
  id: string,
  {
    behavior,
    offsetPx,
    updateHash = false,
  }: {
    behavior?: ScrollBehavior;
    offsetPx?: number;
    updateHash?: boolean;
  } = {},
) {
  const target = document.getElementById(id);
  if (!target) return false;

  const offset = offsetPx ?? getScrollOffsetPx();
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);

  window.scrollTo({ top, behavior });

  if (updateHash) {
    const nextHash = `#${id}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
  }

  return true;
}
