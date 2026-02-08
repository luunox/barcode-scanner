# Barcode Scanner Pro

![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

[🇪🇸 Español](#barcode-scanner-pro-español) | [🇬🇧 English](#barcode-scanner-pro-english)

---

<a name="barcode-scanner-pro-español"></a>
## Barcode Scanner Pro (Español)

Una aplicación web *mobile-first* para escanear y buscar productos por código de barras. Incluye simulación de precios, detalles del producto y un historial de búsqueda persistente.

### ✨ Características

*   **Escaneo de Códigos**: Escáner de cámara integrado usando `html5-qrcode`.
*   **Búsqueda Manual**: Entrada validada para códigos de 6-13 dígitos.
*   **Detalles del Producto**: Obtiene datos reales de la **API OpenFoodFacts**.
*   **Simulación de Precio**: Genera precios aleatorios (S/. 5 - 150) para demostración.
*   **Historial de Búsqueda**: Guarda las búsquedas recientes localmente usando **Zustand**.
*   **Diseño Responsivo**: Enfoque *mobile-first* con diseño adaptado para tablets y escritorio (vista dividida).
*   **Animaciones**: Transiciones suaves con **Framer Motion**.

### 🛠 Tecnologías

*   **Framework**: Next.js 14+ (App Router)
*   **Lenguaje**: TypeScript
*   **Estilos**: Tailwind CSS (v4)
*   **Estado Global**: Zustand (con persistencia)
*   **Manejo de Datos**: TanStack React Query (v5)
*   **Animaciones**: Framer Motion
*   **Testing**: Vitest + React Testing Library
*   **Cámara/Escáner**: APIs Nativas del Navegador

### 🚀 Instalación y Uso

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/tu-usuario/barcode-scanner.git
    cd barcode-scanner
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Iniciar servidor de desarrollo**
    ```bash
    npm run dev
    # o
    yarn dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4.  **Ejecutar Pruebas**
    ```bash
    npm test
    ```

> **Nota sobre la Cámara**: El escáner requiere un **Contexto Seguro** (HTTPS) o `localhost`. Si pruebas desde un dispositivo móvil en tu red local (ej: `192.168.1.5`), la cámara no funcionará por seguridad del navegador. Usa servicios como `ngrok` para exponer tu localhost vía HTTPS.

### 🧪 Códigos de Prueba

Puedes usar estos códigos para probar la aplicación manualmente:

| Código | Producto |
| :--- | :--- |
| `7501055363803` | Coca Cola Refresco |
| `3017620422003` | Nutella |
| `8076809513685` | Ferrero Rocher |
| `5449000000996` | Coca Cola Light |
| `0016000119208` | M&M's Peanut |

---

### 💡 Decisiones de Diseño

*   **Mobile-First & Responsive**: La aplicación se diseñó pensando primero en pantallas pequeñas, pero se adapta a escritorio usando una vista dividida (`Split View`) para aprovechar el espacio, mostrando el historial a la derecha.
*   **React Query**: Se eligió para manejar el estado asíncrono (fetching, loading, error, caching) de forma eficiente y minimizar el boilerplate.
*   **Zustand**: Para el manejo del historial global y su persistencia. Es más ligero y simple que Redux o Context API para este caso de uso.
*   **Testing**: Configuración completa con Vitest para asegurar la calidad del código.

<br />
<br />

---
---
---
<br />

<a name="barcode-scanner-pro-english"></a>
## Barcode Scanner Pro (English)

A mobile-first web application for scanning and searching products by barcode, featuring simulated pricing, detailed product information, and local search history.

### ✨ Features

*   **Barcode Scanning**: Integrated camera scanner using `html5-qrcode`.
*   **Manual Search**: Validated input for 6-13 digit barcodes.
*   **Product Details**: Fetches data from **OpenFoodFacts API**.
*   **Price Simulation**: Generates random prices (S/. 5 - 150) for demonstration purposes.
*   **Search History**: Persists recent searches locally using **Zustand** persistence.
*   **Responsive Design**: Mobile-first approach with optimized layouts for tablets and desktops (split view).
*   **Animations**: Smooth transitions using **Framer Motion**.

### 🛠 Tech Stack

*   **Framework**: Next.js 14+ (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS (v4)
*   **State Management**: Zustand (Persisted Store)
*   **Data Fetching**: TanStack React Query (v5)
*   **Animations**: Framer Motion
*   **Testing**: Vitest + React Testing Library
*   **Camera/Scanning**: Native Browser APIs

### 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/barcode-scanner.git
    cd barcode-scanner
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4.  **Running Tests**
    ```bash
    npm test
    ```

> **Note on Camera**: The camera scanner requires a **Secure Context** (HTTPS) or `localhost`. If you are testing on a mobile device via a local network IP (e.g., `192.168.1.5`), the camera might strictly fail. Use a tunneling service like `ngrok` or `desktop browser mobile toggles` for testing.

## 🧪 Testing with Sample Barcodes

| Código | Producto |
| :--- | :--- |
| `7501055363803` | Coca Cola Refresco |
| `3017620422003` | Nutella |
| `8076809513685` | Ferrero Rocher |
| `5449000000996` | Coca Cola Light |
| `0016000119208` | M&M's Peanut |

## 💡 Key Decisions

*   **Mobile-First & Responsive**: The app was designed with small screens in mind first, but adapts to desktop using a `Split View` to leverage available space, showing history on the right.
*   **React Query**: Chosen to significantly reduce boilerplate for asynchronous state management (fetching, loading, error, caching).
*   **Zustand**: Selected for global history state and its built-in persistence. It's lighter and simpler than Redux or Context API for this specific use case.
*   **Testing**: Full setup with Vitest ensures code quality and reliability.

---

built with ❤️ by [Your Name]
