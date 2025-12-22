const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Дані обов’язкові' });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email вже зайнятий' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const generatedUsername = email.split('@')[0] + Math.floor(Math.random() * 1000);

        const newUser = new User({
            username: generatedUsername,
            email: email,
            password: hashedPassword,
            role: 'user'
        });

        await newUser.save();
        res.status(201).json({ message: 'Успішно зареєстровано' });
    } catch (err) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Користувача не знайдено' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Неправильний пароль' });

        const secret = process.env.JWT_SECRET || '157a!#35bcd7e8ieml456789*!A1B2JlC3xI5*a9b5#5';

        const token = jwt.sign(
            { userId: user._id.toString(), role: user.role },
            secret,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token: token,
            userId: user._id.toString()
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};
