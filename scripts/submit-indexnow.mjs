const SITE_ORIGIN = "https://weldentdental.com";
const INDEXNOW_KEY = "24a6e7049e8748119c5540de4e1748d7";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;

function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

function validSiteUrl(value) {
  try {
    return new URL(value, SITE_ORIGIN).origin === SITE_ORIGIN;
  } catch {
    return false;
  }
}

async function urlsToSubmit() {
  const requested = process.argv.slice(2).map((value) => new URL(value, SITE_ORIGIN).href);
  if (requested.length) return requested.filter(validSiteUrl);

  const response = await fetch(`${SITE_ORIGIN}/sitemap.xml`);
  if (!response.ok) throw new Error(`Could not load sitemap (${response.status})`);
  return sitemapUrls(await response.text()).filter(validSiteUrl);
}

async function submitIndexNow() {
  const keyResponse = await fetch(KEY_LOCATION);
  if (!keyResponse.ok || (await keyResponse.text()).trim() !== INDEXNOW_KEY) {
    throw new Error("IndexNow key file is not available on the production domain");
  }

  const urlList = [...new Set(await urlsToSubmit())];
  if (!urlList.length) throw new Error("No production URLs were found to submit");

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_ORIGIN).hostname,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  if (!response.ok) {
    throw new Error(`IndexNow rejected the submission (${response.status})`);
  }

  console.log(`Submitted ${urlList.length} URLs to IndexNow.`);
}

submitIndexNow().catch((error) => {
  console.warn(`IndexNow submission skipped: ${error instanceof Error ? error.message : error}`);
});
