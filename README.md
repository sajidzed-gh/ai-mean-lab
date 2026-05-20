# AI MEAN Lab (ng-project)

Welcome to the **AI MEAN Lab** repository. This project serves as a laboratory environment integrating an **Angular** frontend, **Express / Node.js** backends, a **NestJS** API layer, and **AI integrations** powered by Groq SDK, WebSockets, and Model Context Protocol (MCP) tooling. 

---

## 🚀 Key Features
* **Modern Frontend:** Built with **Angular v21** and styled cleanly via **Angular Material & CDK**.
* **Robust Backend Architectures:** Features a core **Express** server alongside a modular **NestJS** API.
* **AI Integration:** Leverages the **Groq SDK** for interacting with lightning-fast open-source LLMs.
* **Real-time Operations:** Dedicated WebSocket server configuration (`ws`) for persistent live communication.
* **MCP Server Capabilities:** Includes scripts designed to launch toolsets under the Model Context Protocol.

---

## 🛠️ Tech Stack & Dependencies

### Frontend
* **Angular Suite (`v21.2.0+`):** Core framework for constructing high-performance component architectures.
* **Angular Material & CDK (`v21.2.2+`):** Visual design elements, accessibility primitives, and layouts.

### Backend & AI
* **Express (`v5.2.1+`):** Next-generation minimalist web framework for the API routing structure.
* **NestJS (inside `/api`):** Progressive Node.js framework for highly structured enterprise modules.
* **Groq SDK (`v1.1.1+`):** Direct interface for high-performance AI completions.
* **WebSocket (`ws`):** Bidirectional event-driven network layer.
* **Axios & Node-Fetch:** Flexible HTTP client coverage across both browser and runtime contexts.

### Tooling
* **Vitest & JSDOM:** Fast, modern unit-testing runner executing component behaviors.
* **Prettier:** Formatting validation and standardization across all source variations.
* **Nodemon:** File watching utility for quick, seamless local hot-reloads during API construction.

---

## 💻 Getting Started

### 1. Prerequisites
Ensure you are using the requested package manager and a compatible Node.js environment:
```bash
npm install -g npm@11.9.0
```

### 2. Installation
Clone the repository and fetch project dependencies from the root directory:
```bash
git clone https://github.com
cd ai-mean-lab
npm install
```

---

## 🤖 Development Scripts

Run these tasks from the workspace root to orchestrate individual sub-modules:

### Frontend (Angular) Tasks
* **Start Local Dev Server:** Runs your application on `http://localhost:4200/`.
  ```bash
  npm run start
  ```
* **Production Build:** Optimizes and stores compile artifacts in the `/dist` directory.
  ```bash
  npm run build
  ```
* **Dev Build Watcher:** Keeps your production configuration continuously building as you modify frontend modules.
  ```bash
  npm run watch
  ```

### Backend (Node.js & NestJS) Tasks
* **Run Standard Express Server:** Boots your base `server.js` architecture with automatic hot-reloads.
  ```bash
  npm run start:node
  ```
* **Run Real-time WebSocket Gateway:** Launches the event-driven `serverWebSocket.js` environment.
  ```bash
  npm run startWebSocket:node
  ```
* **Run NestJS Sub-API:** Directs execution flow into development environments established within `/api`.
  ```bash
  npm run start:nestjs
  ```
* **Run Model Context Protocol (MCP) Server:** Provisions external tools through the NestJS module framework.
  ```bash
  npm run start:mcp
  ```

### Quality Assurance Tasks
* **Run Automated Unit Tests:** Executes your components and script test suites utilizing the Vitest framework.
  ```bash
  npm run test
  ```
* **Code Style Verification:** Audits codebases for formatting inconsistencies.
  ```bash
  npm run prettier:check
  ```
* **Automatic Code Formatting:** Sweeps code structures to automatically resolve styling inconsistencies.
  ```bash
  npm run prettier:fix
  ```
