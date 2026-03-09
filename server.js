const express = require('express');
const connectDB = require('./src/config/database');

const userRoutes = require('./src/routes/userRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const tagRoutes = require('./src/routes/tagRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});