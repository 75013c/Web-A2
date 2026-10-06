document.addEventListener("DOMContentLoaded", async () => {
  const form = document.querySelector("#search-form");
  const grid = document.querySelector("#results");
  const count = document.querySelector("#result-count");
  const label = "D";
  const renderCard = (event, i) => {
    const no = String(i + 1).padStart(2, "0");
    const fallback = `[${label} · IMAGE UNAVAILABLE]`;
    const media = event.image
      ? `<img src="/assets/${encodeURIComponent(event.image)}" alt="${escapeText(event.title)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement("span"), { textContent: fallback }))">`
      : fallback;
    return `<article class="catalogue-card"><span class="catalogue-no">${no}</span><div class="catalogue-media">${media}</div><div class="catalogue-body"><h3>${escapeText(event.title)}</h3><p class="meta">${escapeText(event.date)} · ${escapeText(event.location)}</p><span class="status">${escapeText(event.status)}</span><a class="button secondary" href="event.html?id=${event.id}">Open</a></div></article>`;
  };
  const load = async () => {
    showState(grid, "Loading programmes…");
    const params = new URLSearchParams(new FormData(form));
    try {
      const events = await api(`/api/events/search?${params}`);
      count.textContent = `${events.length} programmes found`;
      grid.innerHTML = events.length
        ? events.map(renderCard).join("")
        : `<div class="state" role="status"><img class="state-illustration" src="/assets/empty-state.svg" alt="" width="160" height="120"><p>No programmes match your filters. Try another keyword or category.</p></div>`;
    } catch {
      grid.innerHTML =
        '<div class="empty" role="alert">Search unavailable. <button class="button" id="retry">Retry</button></div>';
      document.querySelector("#retry").onclick = load;
    }
  };
  const incoming = new URLSearchParams(location.search);
  ["keyword", "date", "location", "category"].forEach((name) => {
    const control = form.elements[name];
    if (control && incoming.get(name)) control.value = incoming.get(name);
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    load();
  });
  form.addEventListener("reset", () => window.setTimeout(load, 0));
  load();
});
