const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); 
require('dotenv').config(); 

const apiAuthRoutes = require('./routes/api/authRoutes');
const apiNoteRoutes = require('./routes/api/noteRoutes');

const app = express();

// ----------------------------------------------------
// НАЛАШТУВАННЯ CORS
// ----------------------------------------------------
app.use(cors({
    origin: 'http://localhost:5173', // Порт вашого Vue-клієнта
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ----------------------------------------------------
// MIDDLEWARE ДЛЯ ОБРОБКИ ЗАПИТІВ
// ----------------------------------------------------
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------
// ПІДКЛЮЧЕННЯ МАРШРУТІВ REST API
// ----------------------------------------------------
app.use('/api/auth', apiAuthRoutes); 
app.use('/api/notes', apiNoteRoutes); 

app.use((req, res) => {
    res.status(404).json({ message: 'Ендпоінт не знайдено' });
});

// ----------------------------------------------------
// ПІДКЛЮЧЕННЯ ДО БД ТА ЗАПУСК
// ----------------------------------------------------
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB успішно підключено.');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Сервер працює на http://localhost:${process.env.PORT || 3000}`);
        });
    })
    .catch(err => {
        console.error('Помилка підключення до MongoDB:', err);
    });
