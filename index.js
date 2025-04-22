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

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/',router)
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));