import express from 'express';
const cartsRouter = express.Router();

const users = [];

cartsRouter.get('/', (req, res) => {
    res.status(200).json(users);
});

cartsRouter.post('/', (req, res) => {
    const newUser = req.body.user;
    users.push(newUser);
    res.status(200).json(newUser);
});

export {cartsRouter};