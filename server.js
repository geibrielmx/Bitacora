const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const app = express();
const port = 3000;
const dataFile = 'bitacora.json';

app.use(bodyParser.json());
app.use(cors());

// Endpoint para obtener todos los registros
app.get('/registros', async (req, res) => {
  try {
    const registros = await fs.readJson(dataFile);
    res.json(registros);
  } catch (error) {
    res.json([]);
  }
});

// Endpoint para agregar un nuevo registro
app.post('/registros', async (req, res) => {
  try {
    const registros = await fs.readJson(dataFile);
    registros.push(req.body);
    await fs.writeJson(dataFile, registros, { spaces: 2 });
    res.status(201).json({ message: 'Registro agregado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el registro' });
  }
});

// Endpoint para actualizar un registro existente
app.put('/registros/:clave', async (req, res) => {
  try {
    const registros = await fs.readJson(dataFile);
    const index = registros.findIndex(reg => reg.clave === req.params.clave);
    if (index !== -1) {
      registros[index] = req.body;
      await fs.writeJson(dataFile, registros, { spaces: 2 });
      res.json({ message: 'Registro actualizado exitosamente' });
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro' });
  }
});

// Endpoint para eliminar un registro
app.delete('/registros/:clave', async (req, res) => {
  try {
    const registros = await fs.readJson(dataFile);
    const nuevosRegistros = registros.filter(reg => reg.clave !== req.params.clave);
    await fs.writeJson(dataFile, nuevosRegistros, { spaces: 2 });
    res.json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el registro' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});