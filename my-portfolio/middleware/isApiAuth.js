const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    
    console.log('--- Спроба доступу до API ---');

    if (!authHeader) {
        console.log('Помилка: Заголовок Authorization відсутній');
        return res.status(401).json({ message: 'Немає токена авторизації' });
    }

    const token = authHeader.split(' ')[1]; 
    
    if (!token) {
        console.log('Помилка: Токен не знайдено в заголовку');
        return res.status(401).json({ message: 'Формат токена невірний' });
    }

    try {
        const secret = process.env.JWT_SECRET || '157a!#35bcd7e8ieml456789*!A1B2JlC3xI5*a9b5#5';
        
        const decodedToken = jwt.verify(token, secret);

        if (!decodedToken) {
            console.log('Помилка: Токен не вдалося декодувати');
            return res.status(401).json({ message: 'Помилка авторизації' });
        }

        req.userId = decodedToken.userId;
        req.userRole = decodedToken.role;
        
        console.log('Успіх: Токен валідний. Користувач ID:', req.userId);
        next();
        
    } catch (err) {
        console.error('ПОМИЛКА JWT В MIDDLEWARE:', err.message);
        return res.status(401).json({ message: 'Токен невалідний або прострочений' });
    }
};
