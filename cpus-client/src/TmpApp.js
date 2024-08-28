import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CPUsList from './CPUsList';
import CPUDetail from './CPUDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CPUsList />} />
        <Route path="/cpu/:id" element={<CPUDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
