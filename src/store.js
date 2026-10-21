// Armazenamento em memória para demonstração. Em produção, substitua por banco persistente.
const now = new Date();
export const events = [
  {
    id: "evt-1",
    title: "Feira Criativa da Cidade",
    description: "Encontro de artistas, pequenos negócios, música e gastronomia local.",
    date: new Date(now.getTime() + 3 * 86400000).toISOString(),
    endDate: "",
    category: "Cultura",
    visibility: "public",
    venue: "Praça Central",
    address: "Centro, Teresina - PI",
    lat: -5.0892,
    lng: -42.8016,
    organizerEmail: "organizacao@example.com",
    updatedAt: now.toISOString()
  },
  {
    id: "evt-2",
    title: "Encontro de Comunidade",
    description: "Evento privado de exemplo. Na versão inicial, a API não implementa autenticação.",
    date: new Date(now.getTime() + 6 * 86400000).toISOString(),
    endDate: "",
    category: "Comunidade",
    visibility: "private",
    venue: "Espaço reservado",
    address: "Zona Leste, Teresina - PI",
    lat: -5.075,
    lng: -42.765,
    organizerEmail: "organizacao@example.com",
    updatedAt: now.toISOString()
  }
];
export const subscribers = new Set();
export const notifications = [];
