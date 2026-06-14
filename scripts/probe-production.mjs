const base = "https://www.phonefarm.cyou";

async function probe() {
  const cronPost = await fetch(`${base}/api/cron/expire-orders`, { method: "POST" });
  console.log("POST /api/cron/expire-orders:", cronPost.status, await cronPost.text());

  const cronGet = await fetch(`${base}/api/cron/expire-orders`, { method: "GET" });
  console.log("GET /api/cron/expire-orders:", cronGet.status, await cronGet.text());

  const html = await (await fetch(`${base}/`)).text();
  const canon = html.match(/rel="canonical"[^>]*href="([^"]+)"/);
  const gsc = html.match(/google-site-verification[^>]*content="([^"]+)"/);
  console.log("canonical:", canon?.[1] ?? "not found");
  console.log("GOOGLE_SITE_VERIFICATION in HTML:", gsc ? "yes" : "no");

  const llms = await (await fetch(`${base}/llms.txt`)).text();
  const siteLine = llms.match(/Website: (https:\/\/[^\s]+)/);
  console.log("llms.txt Website line:", siteLine?.[1] ?? "not found");
}

probe().catch((e) => {
  console.error(e);
  process.exit(1);
});
