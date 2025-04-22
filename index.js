import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/db.js';
import router from './routes/schoolRoutes.js';  
dotenv.config();

const app = express();


db.getConnection()
  .then(() => console.log(' MySQL Connected'))
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });

app.use(express.json());
// app.use('/', schoolRoutes);

app.use(cors({ limit: '2mb' }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
      <div style="font-family: Arial, sans-serif; padding: 2rem; background-color: #f0f4f8; color: #333;">
          <h1 style="color: #2c3e50;"> Welcome to the School API</h1>
          <p>Explore the available endpoints below:</p>
          <ul style="line-height: 1.8;">
              <li>
                  <strong> Add a School:</strong><br>
                  <code>/addSchool</code>
              </li>
              <li>
                  <strong> Find Nearby Schools:</strong><br>
                  <code>/listSchools?latitude=your_latitude&longitude=your_longitude</code>
              </li>
          </ul>
      </div>
  `);
});


app.use('/',router)
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));