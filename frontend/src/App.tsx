// src/App.tsx
import React from 'react';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
