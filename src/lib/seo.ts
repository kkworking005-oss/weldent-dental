export const SITE_URL = "https://weldentdental.com";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).href;
}

export function canonicalLinks(path: string) {
  return [{ rel: "canonical", href: absoluteUrl(path) }];
}
