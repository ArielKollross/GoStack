import express from 'express';

const app = express()

app.get('/', (req, res) => res.json({ massage: "Hello typescript"}))

app.listen(3333);

