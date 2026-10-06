document.addEventListener("DOMContentLoaded", async () => {
  const list = document.querySelector("#featured-events");
  const label = "D";
  const renderEntry = (event, i) => {
    const no = String(i + 1).padStart(2, "0");
    const fallback = `[${label} · IMAGE UNAVAILABLE]`;
    const media = event.image
      ? `<img src="/assets/${encodeURIComponent(event.image)}" alt="${escapeText(event.title)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement("span"), { textContent: fallback }))">`
      : fallback;
    return `<article class="catalogue-entry"><span class="catalogue-no">${no}</span><div class="catalogue-info"><h3>${escapeText(event.title)}</h3><p class="meta">${escapeText(event.date)} · ${escapeText(event.location)}</p></div><div class="catalogue-thumb">${media}</div><span class="status">${escapeText(event.category)}</span><span class="status">${escapeText(event.status)}</span><a class="button secondary" href="event.html?id=${event.id}">Open</a></article>`;
  };
  try {
    const events = await api("/api/events/featured");
    list.innerHTML = events.map(renderEntry).join("");
  } catch {
    showState(list, "Programmes could not load. Please try again.");
  }
});
