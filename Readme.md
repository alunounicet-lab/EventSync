












# 🎉 EventSync

## 📌 Sobre o Projeto

O **EventSync** é uma aplicação web desenvolvida para facilitar a criação, divulgação e gerenciamento de eventos. A plataforma permite que organizadores publiquem eventos e que participantes encontrem, acompanhem e confirmem sua presença de forma simples e intuitiva.

Além disso, o sistema oferece notificações em tempo real para manter os usuários atualizados sobre novos eventos e mudanças nos eventos já cadastrados.

---
## 🎯 Objetivo

Centralizar a gestão de eventos em uma única plataforma, proporcionando:

- Divulgação de eventos públicos e privados;
- Confirmação de participação;
- Gerenciamento de inscritos;
- Atualizações em tempo real;
- Melhor experiência para organizadores e participantes.

---

## 👥 Público-Alvo

- Participantes de eventos públicos;
- Participantes de eventos privados;
- Organizadores de eventos;
- Empresas e instituições;
- Comunidades e grupos sociais.

---

## ✨ Funcionalidades

### 🔍 Busca e Visualização de Eventos

- Listagem de eventos disponíveis;
- Busca por nome;
- Visualização de detalhes do evento;
- Exibição da localização utilizando OpenStreetMap.

### 📝 Gerenciamento de Eventos

- Criação de eventos;
- Edição de eventos;
- Exclusão de eventos;
- Controle de participantes;
- Gerenciamento de vagas disponíveis.

### ✅ Participação

- Confirmação de presença;
- Cancelamento de inscrição;
- Acompanhamento dos eventos cadastrados.

### 🔔 Sistema de Notificações

- Novos eventos;
- Alterações de data, horário ou local;
- Cancelamento de eventos;
- Lembretes para eventos próximos.

---

## 🏗️ Arquitetura Simplificada

```text
Usuário
   │
   ▼
Frontend (HTML, CSS)
   │
   ▼
Backend (JavaScript + Lift)
   │
   ├── Banco de Dados
   ├── Sistema de Notificações
   └── OpenStreetMap
```

---

## 🚀 Tecnologias Utilizadas

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- JavaScript
- Lift

### APIs e Serviços

- OpenStreetMap

### Hospedagem

- Vercel

---

# ♿ Acessibilidade e UX Inclusiva

O EventSync será desenvolvido seguindo boas práticas de acessibilidade para garantir uma experiência inclusiva para todos os usuários.

### Implementações

- Navegação por teclado;
- Estrutura HTML semântica;
- Compatibilidade com leitores de tela;
- Contraste adequado;
- Layout responsivo;
- Feedback visual para ações do usuário.

---

# ⚡ Eixo Tecnológico 1: Tempo Real e Reatividade

O sistema utilizará tecnologias de comunicação em tempo real para garantir que os usuários recebam informações instantaneamente.

### Tecnologias

- WebSockets
- Broadcast Channel API

### Aplicação no Projeto

- Atualização automática de eventos;
- Atualização da quantidade de participantes;
- Notificação imediata de alterações;
- Comunicação em tempo real entre sistema e usuários.

### Benefícios

- Melhor experiência do usuário;
- Informações sempre atualizadas;
- Maior engajamento dos participantes.

---

# 🌱 Eixo Tecnológico 2: Performance e Sustentabilidade Digital

O projeto buscará reduzir o consumo de recursos e melhorar o desempenho da aplicação utilizando técnicas modernas de otimização.

### Estratégias

- Deploy na Vercel;
- CDN global;
- Cache de conteúdo;
- Compressão de imagens;
- Formatos WebP e AVIF.

### Benefícios

- Carregamento mais rápido;
- Menor consumo de banda;
- Melhor desempenho em dispositivos móveis;
- Redução do consumo energético da aplicação.

---

# 🌐 Eixo Tecnológico 3: Tendências Emergentes da Web

O EventSync adotará recursos modernos da plataforma web para aumentar a escalabilidade e a experiência do usuário.

## Web Components

Componentes reutilizáveis para:

- Cartões de eventos;
- Campo de pesquisa;
- Modais de inscrição;
- Sistema de notificações.

## Web Workers

Utilizados para:

- Processamento de buscas;
- Filtragem de eventos;
- Operações em segundo plano sem travar a interface.

## Notifications API

Permite enviar notificações diretamente ao navegador para:

- Novos eventos;
- Alterações em eventos inscritos;
- Lembretes automáticos;
- Cancelamentos.

---

## 📋 Requisitos Funcionais

- Visualizar eventos públicos;
- Pesquisar eventos;
- Filtrar eventos;
- Criar eventos;
- Editar eventos;
- Excluir eventos;
- Confirmar participação;
- Visualizar localização no mapa;
- Receber notificações;
- Atualizar informações em tempo real.

---

## 📈 Diferenciais

✅ Atualizações em tempo real

✅ Integração com mapas

✅ Notificações automáticas

✅ Interface acessível

✅ Componentes reutilizáveis

✅ Otimização de desempenho

✅ Aplicação responsiva

---

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos na disciplina de Desenvolvimento Web.