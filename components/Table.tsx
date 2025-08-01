'use client';

import React from 'react';

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

interface TableProps {
  data: DataItem[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="w-full max-w-5xl overflow-x-auto shadow-2xl rounded-xl bg-gray-900">
      <table className="w-full table-auto border-collapse text-white">
        <thead className="bg-blue-900 text-blue-200">
          <tr>
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Site</th>
            <th className="px-6 py-4 text-left">Capteur</th>
            <th className="px-6 py-4 text-left">Téléphone</th>
            <th className="px-6 py-4 text-left">Temps</th>
            <th className="px-6 py-4 text-left">Estimation (%)</th>
            <th className="px-6 py-4 text-left">Heure</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-400">
                Chargement des données...
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="odd:bg-gray-800 even:bg-gray-700">
                <td className="px-6 py-3">{item.id}</td>
                <td className="px-6 py-3">{item.site}</td>
                <td className="px-6 py-3">{item.capteur}</td>
                <td className="px-6 py-3">{item.numero}</td>
                <td className="px-6 py-3">{item.temps}</td>
                <td className="px-6 py-3">{item.estimation}</td>
                <td className="px-6 py-3">{new Date(item.timestamp).toLocaleTimeString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
