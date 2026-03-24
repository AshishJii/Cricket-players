/**
 * @file App.jsx
 * @description Root application component. Sets up React Router with two routes.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlayersPage } from './pages/PlayersPage.jsx';
import { PlayerDetailPage } from './pages/PlayerDetailPage.jsx';

/**
 * Application root with client-side routing.
 *
 * Routes:
 *  /            → PlayersPage (listing)
 *  /player/:id  → PlayerDetailPage (detail)
 *
 * @returns {JSX.Element}
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayersPage />} />
        <Route path="/player/:id" element={<PlayerDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
