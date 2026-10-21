# Conecta Eventos

MVP de divulgação e gestão de eventos públicos e privados, feito com HTML, CSS e JavaScript puro no frontend, Node.js/Express no backend e Leaflet + OpenStreetMap para mapas.

## Requisitos

- Node.js 18 ou superior
- npm
- Conexão com a internet para carregar Leaflet e os tiles do OpenStreetMap

## Executar localmente

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>.

## Estrutura

```text
eventos-conecta/
├── api/
│   └── index.js        # Adaptador serverless para Vercel
├── public/
│   ├── index.html      # Interface semântica e acessível
│   ├── styles.css      # Layout responsivo
│   └── app.js          # Busca, formulário, mapa e chamadas à API
├── src/
│   ├── app.js          # Rotas REST e validação
│   └── store.js        # Dados de demonstração em memória
├── .env.example
├── .gitignore
├── package.json
├── server.js           # Servidor Express local
└── vercel.json
```

## Funcionalidades incluídas

- Listagem e filtro de eventos públicos por texto/categoria.
- Cadastro de eventos via formulário e API REST.
- Visibilidade pública/privada no modelo de dados.
- Mapa de navegação com marcadores e mapa de seleção de local.
- Endpoint de inscrição de e-mail e registro demonstrativo de notificações.
- Estados de carregamento/erro, rótulos de formulário, região de status ARIA, foco visível, link para pular conteúdo e respeito a `prefers-reduced-motion`.

## API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/health` | Estado da API |
| GET | `/api/events` | Lista eventos públicos |
| GET | `/api/events/:id` | Consulta evento público |
| POST | `/api/events` | Cria evento |
| PUT | `/api/events/:id` | Atualiza evento |
| DELETE | `/api/events/:id` | Exclui evento |
| POST | `/api/subscriptions` | Registra e-mail para notificações |
| GET | `/api/notifications` | Lista notificações registradas |

Exemplo de criação:

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Encontro de tecnologia",
    "description": "Palestras e networking",
    "date": "2027-01-20T18:00:00.000Z",
    "category": "Educação",
    "visibility": "public",
    "venue": "Centro cultural",
    "address": "Teresina - PI",
    "lat": -5.0892,
    "lng": -42.8016
  }'
```

## Deploy na Vercel

1. Suba o projeto para um repositório Git.
2. Importe o repositório no painel da Vercel.
3. A Vercel detectará `vercel.json`; não é necessário configurar build de frontend.
4. Faça o deploy e teste `/api/health`.

**Atenção:** este é um scaffold inicial. O armazenamento atual fica em memória e pode ser reiniciado ou variar entre instâncias serverless. Para produção, conecte um banco de dados persistente (por exemplo, PostgreSQL gerenciado), configure autenticação/autorização e use um serviço de e-mail ou push para notificações reais.

## Segurança e privacidade — antes de produção

- A interface permite selecionar “privado”, mas não implementa login, autorização de organizador, convites ou controle de acesso real. Não use dados sensíveis nem considere os eventos privados seguros até implementar isso.
- A API de criação/edição/exclusão está aberta neste MVP. Proteja essas rotas com autenticação, autorização, rate limiting e validação adicional.
- O endpoint de notificações é demonstrativo; o cadastro não dispara e-mails por si só.
- Configure política de privacidade, consentimento e mecanismo de descadastro antes de enviar mensagens.
- Para geocodificação de endereço, adicione um serviço apropriado; atualmente o mapa usa coordenadas selecionadas pelo usuário.
- Para tráfego relevante, respeite a política de uso dos tiles do OpenStreetMap e considere um provedor de tiles.

## Acessibilidade

A interface usa landmarks semânticos, `label` associado aos campos, foco de teclado visível, link de salto, mensagens de status com `aria-live`, textos alternativos/rótulos para mapas e suporte a movimento reduzido. Faça testes manuais de teclado e leitor de tela e valide contraste e WCAG 2.2 AA antes de publicar.
