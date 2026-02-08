# Barcode Scanner Pro

A mobile-first web application for scanning and searching products by barcode, featuring simulated pricing and local history storage.

![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## Features

- **Barcode Scanning**: Integrated camera scanner using `html5-qrcode`.
- **Manual Search**: Validated input for 6-13 digit barcodes.
- **Product Details**: Fetches data from OpenFoodFacts API.
- **Price Simulation**: Generates random prices (S/. 5 - 150) for demonstration.
- **Search History**: Persists recent searches locally.
- **Mobile-First Design**: Optimized for mobile devices with a responsive container for desktop.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand (with persistence)
- **Data Fetching**: TanStack React Query
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Scanning**: Html5-Qrcode

## getting Started

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd barcode-scanner
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in browser**
    Navigate to `http://localhost:3000`.

    > **Note on Camera**: The camera scanner requires a secure context (HTTPS) or `localhost`. If testing on a mobile device via local network IP, the camera might not start unless you serve via HTTPS.

## Key Decisions

- **Zustand**: Chosen for global state management due to its simplicity and built-in persistence middleware, perfect for storing search history.
- **React Query**: Used for data fetching to handle caching, loading, and error states out of the box.
- **Mobile-First Layout**: The app is wrapped in a constrained container on desktop to simulate a mobile app experience, ensuring the design remains focused on the primary use case.
- **Html5-Qrcode**: Selected for reliable barcode scanning capabilities directly in the browser.

## Testing with Sample Barcodes

- `7501055363803` - Coca Cola
- `3017620422003` - Nutella
- `8076809513685` - Ferrero Rocher
