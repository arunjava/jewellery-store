# Aurelia Jewellery

A responsive jewellery storefront MVP built with Angular 21, Angular Material, and Java Spring Boot. The Spring Boot API serves an in-memory catalog; the Angular app provides browsing, search, category filters, product details, and a browser-persisted cart.

## Requirements

- Java 17 or newer
- Maven 3.9 or newer
- Node.js 20.19+, 22.12+, or 24+ and npm

## Run locally

1. Start the API:

   ```powershell
   cd backend
   mvn spring-boot:run
   ```

   The API runs at `http://localhost:8080`. Try `http://localhost:8080/api/products`.

2. In another terminal, start the storefront:

   ```powershell
   cd frontend
   npm install
   npm start
   ```

   Open `http://localhost:4200`. The development server's `/api` proxy forwards requests to Spring Boot.

## API

- `GET /api/products` — the full catalog; accepts optional `q` and `category` query parameters
- `GET /api/products/{id}` — product details
- `GET /api/categories` — available category names

Catalog data is intentionally seeded in memory for this MVP and resets when the backend restarts. Cart contents are stored in the browser's local storage. No checkout, payments, accounts, or admin features are included.

## Checks

```powershell
cd backend
mvn test
cd ..\frontend
npm run build
```
