import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Ingestion from './pages/Ingestion';
import Brief from './pages/Brief';
import Archive from './pages/Archive';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/ingestion" replace />} />
          <Route path="ingestion" element={<Ingestion />} />
          <Route path="brief" element={<Brief />} />
          <Route path="archive" element={<Archive />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
