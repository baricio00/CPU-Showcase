const express = require('express');
const cors = require('cors'); 
const { Pool } = require('pg');

// Initialize express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'SQLmaster',
  port: 5432,
});

// Route to get all CPUs
app.get('/cpus', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cpu.id, brand, model, socket.name AS socket
      FROM cpu
      JOIN socket ON cpu.socket_name = socket.name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to get a single CPU by ID
app.get('/cpu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT cpu.id, brand, model, socket_name, clockspeed, cores, threads, tdp, price_eur
      FROM cpu
      JOIN socket ON cpu.socket_name = socket.name
      WHERE cpu.id = $1
    `, [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to update a CPU
app.put('/cpu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, model, socket_name, clockspeed, cores, threads, tdp, price_eur } = req.body;
    await pool.query(`
      UPDATE cpu
      SET brand = $1, model = $2, socket_name = $3, clockspeed = $4, cores = $5, threads = $6, tdp = $7, price_eur = $8
      WHERE id = $9
    `, [brand, model, socket_name, clockspeed, cores, threads, tdp, price_eur, id]);
    res.send('CPU updated successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new CPU
app.post('/api/cpus', async (req, res) => {
  const { brand, model, socket_name, clockspeed, cores, threads, tdp, price_eur } = req.body;
  const result = await pool.query(
    'INSERT INTO cpus (brand, model, socket_name, clockspeed, cores, threads, tdp, price_eur) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [brand, model, socket_name, clockspeed, cores, threads, tdp, price_eur]
  );
  res.json(result.rows[0]);
});

// Route to get all socket options
app.get('/sockets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM socket');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
