# NodeJS Assignment – AltSchool

This repo contains two assignments:

## 1. Static Web Server (`server.js`)
- Serves `index.html` at `/index.html`
- Any other `.html` path returns a `404.html` page

## 2. Inventory API Server (`serverApi.js`)
- CRUD API to manage clothing inventory (name, price, size, id)
- Data is persisted in a local `resource/inventory.json` file

---

## Running the Servers

### Web Server

```bash
cd NodeJS
node server.js

##Visit: http://localhost:2000/index.html

### Inventory API

```bash
cd NodeJS
node serverApi.js

##Visit: http://localhost:3000/