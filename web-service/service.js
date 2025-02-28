const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;

const WS_PORT = 3001;
const app = express();

const URL_RES = './web-service/response.json';

// Habilita CORS en todas las solicitudes
app.use(cors());
app.listen(WS_PORT, () => {console.log("WS iniciado en puerto: ", WS_PORT)});

// Función asincrónica para leer un archivo JSON
async function readJsonFile(url) {
  try {
    const rawData = await fs.readFile(url, 'utf8');
    const jsonData = JSON.parse(rawData);
    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Función asincrónica para obtener el objeto de responsables
async function getResponsablesObj(url) {
  try {
    const objData = await readJsonFile(url);
    const parsedObj = objData.data.responsables;
    return parsedObj;
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
}

// Ejecución de función getResponsablesObj y seteo de HTTP Get para obtener objeto responsables.
// Manejo de errores 404 y 500
getResponsablesObj(URL_RES).then(resObj => {
  app.get("/responsables", (req, res) => {
    try {
      if (!resObj || resObj.length === 0) {
        res.status(404).send('Not Found');
      } else {
        res.json(resObj);
      }
    } catch (error) {
      console.error('WS error: ', error);
      res.status(500).send('Internal Server Error');
    }
  });
}).catch(error => {
  console.error('Error initializing WS:', error);
});
