const NAMED: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  rsquo: "\u2019", lsquo: "\u2018", rdquo: "\u201D", ldquo: "\u201C",
  mdash: "\u2014", ndash: "\u2013", hellip: "\u2026",
};

export function decodeEntities(input: string): string {
  return input.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === "#") {
      const isHex = entity[1]?.toLowerCase() === "x";
      const code = isHex ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return NAMED[entity.toLowerCase()] ?? match;
  });
}

/**
 * Turns HTML into plain text. The result is only ever rendered through React
 * (which escapes it), and tags are removed before entities are decoded so
 * encoded markup can never be re-interpreted as tags.
 */
export function stripHtml(html: string): string {
  const text = html
    .replace(/<(script|style|noscript|iframe|svg)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<\/(p|div|h[1-6]|li|blockquote|figure|figcaption)>|<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, " ");
  return decodeEntities(text)
    .replace(/Subscribe now|Leave a comment/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function firstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  const url = match ? decodeEntities(match[1]) : null;
  return url && url.startsWith("https://") ? url : null;
}

export function wordCount(text: string): number {
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

export function readingMinutes(text: string): number {
  const words = wordCount(text);
  return words === 0 ? 0 : Math.max(1, Math.round(words / 225));
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-]+$/, "")}\u2026`;
}

export function firstSentence(text: string): string | null {
  const match = text.match(/^(.+?[.!?])(\s|$)/);
  return match ? match[1] : null;
}
