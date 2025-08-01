'use client';

import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface SensorData {
  id: number;
  riviere: string;
  adresse: string;
  distance: number;
  nom_resp: string;
  tel: string;
  temps12: number;
  temps23: number;
  estimation: number;
  timestamp: string;
  lat: number;
  lng: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: -4.325, // Centré sur Kinshasa
  lng: 15.31,
};

const GOOGLE_MAPS_API_KEY = "AIzaSyAWa0btJAbyT9gRUBRL9o2bKVB4P-Mwbg8"; // 🔑 Ta clé ici

export default function Map() {
  const [data, setData] = useState<SensorData[]>([]);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={12} // Zoom général sur Kinshasa
      >
        {data.map((sensor) => (
          <Marker
            key={sensor.id}
            position={{ lat: sensor.lat, lng: sensor.lng }}
            title={`${sensor.riviere} - ${sensor.adresse}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
