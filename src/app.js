import { Router } from "express";
import { randomUUID } from "node:crypto";
import { events, subscribers, notifications } from "./store.js";

const router = Router();
const validVisibility = new Set(["public", "private"]);
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanEvent(input) {
  const title = String(input.title || "").trim();
  const date = new Date(input.date);
  const lat = Number(input.lat);
  const lng = Number(input.lng);
  if (title.length < 3 || title.length > 120) throw new Error("O título deve ter entre 3 e 120 caracteres.");
  if (!input.date || Number.isNaN(date.getTime())) throw new Error("Informe uma data válida.");
  if (!Number.isFinite(lat) || lat < -90 || lat > 90 || !Number.isFinite(lng) || lng < -180 || lng > 180) {
    throw new Error("Selecione uma localização válida no mapa.");
  }
  const visibility = validVisibility.has(input.visibility) ? input.visibility : "public";
  return {
    title,
    description: String(input.description || "").trim().slice(0, 2000),
    date: date.toISOString(),
    endDate: input.endDate ? new Date(input.endDate).toISOString() : "",
    category: String(input.category || "Geral").trim().slice(0, 60),
    visibility,
    venue: String(input.venue || "").trim().slice(0, 120),
    address: String(input.address || "").trim().slice(0, 240),
    lat, lng,
    organizerEmail: String(input.organizerEmail || "").trim().toLowerCase().slice(0, 254)
  };
}

function notify(type, event) {
  // MVP: registra notificações localmente. Integre e-mail/push para entrega real.
  const notice = { id: randomUUID(), type, eventId: event.id, title: event.title, createdAt: new Date().toISOString(), recipients: [...subscribers] };
  notifications.unshift(notice);
  return notice;
}

router.get("/health", (_req, res) => res.json({ ok: true, service: "eventos-conecta" }));

router.get("/events", (req, res) => {
  // Sem autenticação nesta base, apenas eventos públicos são expostos pela listagem pública.
  const publicEvents = events.filter(event => event.visibility === "public");
  res.json(publicEvents.sort((a, b) => new Date(a.date) - new Date(b.date)));
});

router.get("/events/:id", (req, res) => {
  const event = events.find(item => item.id === req.params.id);
  if (!event) return res.status(404).json({ error: "Evento não encontrado." });
  if (event.visibility === "private") return res.status(403).json({ error: "Este evento é privado." });
  res.json(event);
});

router.post("/events", (req, res) => {
  try {
    const data = cleanEvent(req.body);
    const event = { id: randomUUID(), ...data, updatedAt: new Date().toISOString() };
    events.push(event);
    notify("event-created", event);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message || "Dados inválidos." });
  }
});

router.put("/events/:id", (req, res) => {
  const index = events.findIndex(item => item.id === req.params.id);
  if (index < 0) return res.status(404).json({ error: "Evento não encontrado." });
  try {
    const data = cleanEvent(req.body);
    const previous = events[index];
    events[index] = { ...previous, ...data, updatedAt: new Date().toISOString() };
    notify("event-updated", events[index]);
    res.json(events[index]);
  } catch (error) {
    res.status(400).json({ error: error.message || "Dados inválidos." });
  }
});

router.delete("/events/:id", (req, res) => {
  const index = events.findIndex(item => item.id === req.params.id);
  if (index < 0) return res.status(404).json({ error: "Evento não encontrado." });
  events.splice(index, 1);
  res.status(204).end();
});

router.post("/subscriptions", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  if (!validEmail.test(email)) return res.status(400).json({ error: "Informe um e-mail válido." });
  subscribers.add(email);
  res.status(201).json({ subscribed: true, message: "Cadastro registrado para esta sessão do servidor." });
});

router.get("/notifications", (_req, res) => res.json(notifications.slice(0, 50)));

export default router;
