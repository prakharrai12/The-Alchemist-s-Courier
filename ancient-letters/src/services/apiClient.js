// WYRMVAULT — §9 Safe API Client with In-World Error Handling
export async function safeFetchJson(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get("content-type") || "";

    // Check if the response contains JSON
    if (!contentType.includes("application/json")) {
      const rawText = await res.text();
      console.error(`[Ward Alert] Non-JSON response from ${url} (status ${res.status}):`, rawText.slice(0, 200));
      throw new Error(`The alchemical ward at ${url} returned an unformatted response (HTTP ${res.status}). Please verify the server connection and try again.`);
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || `The ward rejected your signet frequency (HTTP ${res.status}).`);
    }

    return data;
  } catch (err) {
    if (err.name === "TypeError" && err.message.includes("fetch")) {
      throw new Error("Unable to reach the Wyrmvault server wards (`Network Connection Lost`). Verify that the dungeon backend is running.");
    }
    throw err;
  }
}
