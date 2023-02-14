import { Routes, Route } from 'react-router-dom';

import Login from './pages/Auth/Login/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* if no route matches, show 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
