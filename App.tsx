
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CommandesGros from './pages/CommandesGros';
import CommandesDetail from './pages/CommandesDetail';
import Offres from './pages/Offres';
import { AppProvider } from './store';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gros" element={<CommandesGros />} />
            <Route path="/detail" element={<CommandesDetail />} />
            <Route path="/offres" element={<Offres />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
