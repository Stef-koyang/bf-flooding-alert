import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'database.json');

function readData() {
  if (fs.existsSync(dataFile)) {
    const jsonData = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(jsonData);
  }
  return [];
}

function saveData(data: any[]) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const data = readData();
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    try {
      const existingData = readData();

      const { site, capteur, lat, lng } = req.body;

      if (!site || !capteur || !lat || !lng) {
        return res.status(400).json({ error: 'site, capteur, lat et lng sont requis' });
      }

      const newId = existingData.length > 0 ? existingData[existingData.length - 1].id + 1 : 1;
      const newNumero = `+243000000${newId}`;

      const now = new Date();
      const temps = now.toTimeString().slice(0, 5);
      const timestamp = now.toISOString();

      // Exemple d'estimation calculée côté interface, mais on met une valeur par défaut ici (peut être modifiée)
      const estimation = Math.floor(Math.random() * 100);

      const newEntry = {
        id: newId,
        site,
        capteur,
        numero: newNumero,
        temps,
        lat,
        lng,
        estimation,
        timestamp,
      };

      existingData.push(newEntry);
      saveData(existingData);

      return res.status(201).json(newEntry);
    } catch (error) {
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  return res.status(405).json({ error: 'Méthode non autorisée' });
}
