document.addEventListener("DOMContentLoaded", async () => {
  const id = new URLSearchParams(location.search).get("id");
  const root = document.querySelector("#event-detail");
  const label = "D";
  if (!id) return showState(root, "Event ID is missing.");
  try {
    const event = await api(`/api/events/${encodeURIComponent(id)}`);
    const image = (name, alt) =>
      `<img src="/assets/${encodeURIComponent(name)}" alt="${escapeText(alt)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement("span"), { textContent: "[${label} · IMAGE UNAVAILABLE]" }))">`;
    const gallery = (event.gallery || [event.image])
      .filter(Boolean)
      .map((name) => `<div class="program-shot">${image(name, event.title)}</div>`)
      .join("");
    const suspended = event.status === "suspended";
    const register = suspended
      ? '<span class="button" aria-disabled="true">Register interest</span><p class="meta">This activity is not open for registration.</p>'
      : `<a class="button" href="registration-placeholder.html?id=${event.id}">Register interest</a>`;
    root.innerHTML = `<div class="program-grid"><aside class="program-side"><span class="status">${escapeText(event.status)}</span><h1>${escapeText(event.title)}</h1><dl class="program-facts"><dt>Date</dt><dd>${escapeText(event.date)}</dd><dt>Location</dt><dd>${escapeText(event.location)}</dd><dt>Category</dt><dd>${escapeText(event.category)}</dd><dt>Ticket price</dt><dd>${escapeText(event.price)}</dd><dt>Access</dt><dd>Community supported</dd></dl>${register}</aside><div class="program-main"><div class="program-media">${image(event.image, event.title)}</div><p class="detail-copy">${escapeText(event.description)}</p><h2 class="eyebrow">Charitable purpose</h2><p class="detail-copy">${escapeText(event.purpose)}</p><div class="program-gallery">${gallery}</div></div></div>`;
  } catch {
    showState(
      root,
      "Event not found. Return to search and choose another event.",
    );
  }
});
