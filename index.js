const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Sync models with database
sequelize.sync()
  .then(() => console.log('Database synchronized...'))
  .catch(err => console.log('Error: ' + err));

app.get('/healthCheck', async (req, res) => {
  try {
    res.status(200).json({
        message: "Server is running!!!"
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
