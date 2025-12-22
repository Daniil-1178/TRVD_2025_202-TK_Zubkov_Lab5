const Note = require('../../models/note');

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Помилка сервера при отриманні нотаток' });
    }
};

exports.getNote = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.userId });
        if (!note) return res.status(404).json({ message: 'Нотатку не знайдено' });
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.createNote = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ 
            message: 'Невалідні дані: заголовок і зміст обов’язкові' 
        });
    }

    try {
        const newNote = new Note({
            title: title,
            content: content,
            userId: req.userId 
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ message: 'Помилка при збереженні нотатки' });
    }
};

exports.updateNote = async (req, res) => {
    const { title, content } = req.body;

    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { title, content },
            { new: true }
        );
        if (!note) return res.status(404).json({ message: 'Нотатку не знайдено' });
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: 'Помилка при оновленні' });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const result = await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!result) return res.status(404).json({ message: 'Нотатку не знайдено' });
        res.status(200).json({ message: 'Нотатку видалено' });
    } catch (err) {
        res.status(500).json({ message: 'Помилка при видаленні' });
    }
};
