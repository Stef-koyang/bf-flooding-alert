'use client';

import React, { useEffect, useState } from 'react';
import Map from '@/components/Map';
import Table from '@/components/Table';
import Alarm from '@/components/Alarm';

interface DataItem {
  id: number;
  site: string;
  capteur: string;
  numero: string;
  temps: string;
  lat: number;
  lng: number;
  estimation: number;
  timestamp: string;
}

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);

  // Charger les données depuis l'API
  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 font-mono">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-blue-400 drop-shadow">BF FLOODING ALERT</h1>
        <p className="text-gray-400 mt-2">Tableau de surveillance des zones à risque</p>
      </header>

      <main className="flex flex-col items-center gap-8">
        <Table data={data} />
        <Map data={data} />
        <Alarm data={data} />
      </main>

      <footer className="text-center text-gray-600 text-sm mt-8">
        &copy; 2025 BF INONDATION ALERT - Tous droits réservés
      </footer>
    </div>
  );
}
