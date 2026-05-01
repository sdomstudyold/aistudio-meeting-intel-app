import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      <main className="ml-64 pt-16 min-h-screen">
        <div className="max-w-[1120px] mx-auto px-10 py-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
