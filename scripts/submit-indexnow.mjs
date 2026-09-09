const SITE_ORIGIN = "https://weldentdental.com";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const indexNowKey = process.env.INDEXNOW_KEY?.trim();

function canonicalUrl(value) {
  try {
    const url = new URL(value, SITE_ORIGIN);
    return url.origin === SITE_ORIGIN ? url.href : null;
  } catch {
    return null;
  }
}

async function submitIndexNow() {
  if (!indexNowKey) {
    console.warn("IndexNow submission skipped: INDEXNOW_KEY is not configured.");
    return;
  }

  const urlList = [...new Set(process.argv.slice(2).map(canonicalUrl).filter(Boolean))];
  if (!urlList.length) {
    console.warn(
      "IndexNow submission skipped: pass only the canonical URLs changed by this release.",
    );
    return;
  }

  const keyLocation = `${SITE_ORIGIN}/${indexNowKey}.txt`;
  const keyResponse = await fetch(keyLocation);
  if (!keyResponse.ok || (await keyResponse.text()).trim() !== indexNowKey) {
    throw new Error("IndexNow key verification failed on the production domain");
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_ORIGIN).hostname,
      key: indexNowKey,
      keyLocation,
      urlList,
    }),
  });

  if (!response.ok) throw new Error(`IndexNow rejected the submission (${response.status})`);
  console.log(`Submitted ${urlList.length} changed canonical URLs to IndexNow.`);
}

submitIndexNow().catch((error) => {
  console.warn(`IndexNow submission skipped: ${error instanceof Error ? error.message : error}`);
});
