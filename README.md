# Cricket Players SPA

A performant, React-based Single Page Application (SPA) designed to display cricket player profiles and career statistics, powered by the [SportMonks Cricket API](https://www.sportmonks.com/cricket-api/).

## Features

- **Players Listing**: Paginated grid view showing cricket players.
- **Advanced Filtering**: Client-side filtering by Search (last name), Country, and Position.
- **Sorting**: Order the list by First Name, ID, or Recently Updated.
- **Detailed Player Profiles**: Dedicated pages featuring personal metadata, photos, and a comprehensive, aggregated career statistics table.
- **Optimized Caching**: Utilizes **IndexedDB** to cache large API datasets (with a 24-hour TTL). This prevents redundant network requests, massively improves perceived load times, and saves API quota.
- **URL State Synchronization**: All filters, sorting, and pagination parameters are synced with the URL query string, making the application state fully shareable and deep-linkable.
- **Vanilla CSS Architecture**: Built using native CSS Custom Properties (CSS variables) to create a sleek, modern, dark-themed design system without the overhead of heavy CSS frameworks.

## Tech Stack

- **Framework**: React 19 + Vite
- **Routing**: React Router DOM
- **Local Storage**: `idb` (IndexedDB wrapper)
- **Styling**: Vanilla CSS
- **Linting & Formatting**: ESLint + Prettier

## Prerequisites

- Node.js (v18+ recommended)
- A valid SportMonks API Key

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Copy `.env.example` to `.env` (or create a new `.env` file) and add your SportMonks API key:
   ```env
   VITE_SPORTMONKS_API_KEY=your_api_key_here
   
   # For local development, this relies on the Vite proxy in vite.config.js to bypass CORS
   VITE_API_BASE_URL=/api/v2.0
   ```

3. **Development Server**
   Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

4. **Production Build**
   To create an optimized production build:
   ```bash
   npm run build
   ```
   The compiled assets will be placed in the `dist/` folder.

## Available Scripts

- `npm run dev` - Start the Vite dev server
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build locally
- `npm run lint` - Check codebase for ESLint errors
- `npm run lint:fix` - Automatically fix linting issues
- `npm run format` - Format all source files with Prettier
- `npm run format:check` - Verify files are correctly formatted

## Architecture Highlights

- **`src/api/`**: Contains the API client logic for fetching from SportMonks. It automatically injects the `api_token` param and is aware of the local Vite proxy.
- **`src/db/`**: Contains the robust IndexedDB caching implementation. Players and countries are fetched once and stored, enabling instantly snappy client-side filtering.
- **`src/hooks/`**: Includes custom React hooks (`usePlayersData`, `useCountries`, `usePlayerDetail`) that manage the fallback between the IndexedDB cache and the actual network API. `useFilters` controls reading from and writing to the URL.
- **`src/utils/`**: Pure functions containing the heavy logic for filtering, sorting, and paginating arrays, extracted away from React components for easier testing and readability.
- **`src/styles/`**: Component-scoped CSS files linked together by a central `variables.css` token system to govern typography, spacing, and colors.
