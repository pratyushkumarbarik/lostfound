require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const { connectDatabase } = require('./src/config/db');
const { seedAdmin } = require('./src/seed/admin');
const publicRoutes = require('./src/routes/public');
const adminRoutes = require('./src/routes/admin');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve uploads folder statically, must match multer upload destination folder
const uploadsPath = path.join(__dirname, 'src', 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.use('/', publicRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  console.log("Mongo URI:", process.env.MONGO_URI);
  try {
    await connectDatabase();
    await seedAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
