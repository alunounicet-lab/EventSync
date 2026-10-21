const API = "/api";
let events = [];
let browseMap;
let pickMap;
let pickMarker;
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const esc = (value = "") => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

function dateLabel(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Data a confirmar";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(date);
}
function visualClass(category = "") {
  const value = category.toLowerCase();
  if (value.includes("mús") || value.includes("music")) return "music";
  if (value.includes("comun")) return "community";
  if (value.includes("educ")) return "education";
  if (value.includes("esport")) return "sports";
  if (value.includes("negóc")) return "business";
  return "";
}
function visualIcon(category = "") {
  const value = category.toLowerCase();
  if (value.includes("mús")) return "♫";
  if (value.includes("educ")) return "✎";
  if (value.includes("esport")) return "⌁";
  if (value.includes("negóc")) return "↗";
  if (value.includes("comun")) return "✳";
  return "✦";
}
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3800);
}

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Falha na solicitação (${response.status}).`);
  }
  return response.status === 204 ? null : response.json();
}

function renderEvents() {
  const query = $("#search").value.trim().toLocaleLowerCase("pt-BR");
  const category = $("#category-filter").value;
  const filtered = events.filter(event => {
    const haystack = `${event.title} ${event.description} ${event.venue} ${event.address} ${event.category}`.toLocaleLowerCase("pt-BR");
    return (!query || haystack.includes(query)) && (!category || event.category === category);
  });
  $("#result-count").textContent = `${filtered.length} ${filtered.length === 1 ? "evento encontrado" : "eventos encontrados"}`;
  $("#event-list").innerHTML = filtered.length ? filtered.map(event => `
    <article class="event-card">
      <div class="event-visual ${visualClass(event.category)}"><span class="visual-icon" aria-hidden="true">${visualIcon(event.category)}</span></div>
      <div class="event-card-body">
        <div class="event-tags"><span class="event-tag">${esc(event.category || "Geral")}</span><time class="event-date" datetime="${esc(event.date)}">${esc(dateLabel(event.date))}</time></div>
        <h3>${esc(event.title)}</h3>
        <p class="description">${esc(event.description || "Mais informações serão divulgadas em breve.")}</p>
        <p class="event-location"><span aria-hidden="true">⌖</span><span>${esc(event.venue || "Local a confirmar")}${event.address ? ` · ${esc(event.address)}` : ""}</span></p>
      </div>
    </article>`).join("") : `<p class="empty-state">Nenhum evento encontrado. Tente outro termo ou categoria.</p>`;
  updateBrowseMarkers(filtered);
}

function populateCategories() {
  const categories = [...new Set(events.map(event => event.category).filter(Boolean))].sort();
  $("#category-filter").innerHTML = '<option value="">Todas as categorias</option>' + categories.map(category => `<option value="${esc(category)}">${esc(category)}</option>`).join("");
}

function initMaps() {
  if (!window.L) {
    $("#map").innerHTML = '<p class="muted">Não foi possível carregar o mapa. Verifique sua conexão.</p>';
    $("#pick-map").innerHTML = '<p class="muted">O mapa não carregou; informe as coordenadas manualmente.</p>';
    return;
  }
  browseMap = L.map("map", { scrollWheelZoom: false }).setView([-5.0892, -42.8016], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(browseMap);
  pickMap = L.map("pick-map", { scrollWheelZoom: false }).setView([-5.0892, -42.8016], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(pickMap);
  pickMap.on("click", event => setPickedLocation(event.latlng.lat, event.latlng.lng));
  setPickedLocation(Number($("#lat").value), Number($("#lng").value));
  setTimeout(() => { browseMap.invalidateSize(); pickMap.invalidateSize(); }, 150);
}

function setPickedLocation(lat, lng) {
  $("#lat").value = Number(lat).toFixed(6);
  $("#lng").value = Number(lng).toFixed(6);
  if (!pickMap || !window.L) return;
  const point = [Number(lat), Number(lng)];
  if (!pickMarker) pickMarker = L.marker(point, { keyboard: true, title: "Local selecionado" }).addTo(pickMap);
  else pickMarker.setLatLng(point);
  pickMap.setView(point, Math.max(pickMap.getZoom(), 13));
}

let browseMarkers = [];
function updateBrowseMarkers(items) {
  if (!browseMap || !window.L) return;
  browseMarkers.forEach(marker => marker.remove());
  browseMarkers = items.map(event => {
    const marker = L.marker([event.lat, event.lng], { keyboard: true, title: event.title, alt: event.title }).addTo(browseMap);
    marker.bindPopup(`<strong>${esc(event.title)}</strong><br>${esc(dateLabel(event.date))}<br>${esc(event.venue || event.address || "Local a confirmar")}`);
    marker.on("click", () => marker.openPopup());
    return marker;
  });
}

async function loadEvents() {
  try {
    events = await request("/events");
    populateCategories();
    renderEvents();
  } catch (error) {
    $("#result-count").textContent = "Não foi possível carregar";
    $("#event-list").innerHTML = `<p class="empty-state">${esc(error.message)} Confira se o servidor está em execução.</p>`;
  }
}

$("#search").addEventListener("input", renderEvents);
$("#category-filter").addEventListener("change", renderEvents);
$("#lat").addEventListener("change", () => setPickedLocation(Number($("#lat").value), Number($("#lng").value)));
$("#lng").addEventListener("change", () => setPickedLocation(Number($("#lat").value), Number($("#lng").value)));

$("#event-form").addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = $("#form-status");
  status.classList.remove("error");
  status.textContent = "Publicando evento…";
  const data = Object.fromEntries(new FormData(form).entries());
  data.lat = Number(data.lat);
  data.lng = Number(data.lng);
  data.date = new Date(data.date).toISOString();
  try {
    const created = await request("/events", { method: "POST", body: JSON.stringify(data) });
    status.textContent = created.visibility === "private"
      ? "Evento privado criado. Esta base ainda não tem autenticação nem área de acesso privado."
      : "Evento publicado! Ele já aparece na agenda pública.";
    form.reset();
    $("#lat").value = "-5.089200";
    $("#lng").value = "-42.801600";
    setPickedLocation(-5.0892, -42.8016);
    await loadEvents();
    showToast("Evento criado com sucesso.");
    if (created.visibility === "public") $("#eventos").scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    status.textContent = error.message;
    status.classList.add("error");
  }
});

$("#subscribe-form").addEventListener("submit", async event => {
  event.preventDefault();
  const status = $("#subscribe-status");
  status.textContent = "Registrando…";
  try {
    const result = await request("/subscriptions", {
      method: "POST",
      body: JSON.stringify({ email: $("#subscriber-email").value })
    });
    status.textContent = `${result.message} Notificações por e-mail ainda precisam de um provedor de entrega.`;
    $("#subscriber-email").value = "";
  } catch (error) {
    status.textContent = error.message;
  }
});

$("#year").textContent = new Date().getFullYear();
initMaps();
loadEvents();
