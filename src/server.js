'use strict';
const express = require('express')
const router = require('./routes')

require('dotenv').config()

const app = express()
const port = 5151

app.get('/', (req, res) => {
  res.send('Desafio técnico Mobix!')
})

app.use(express.json())

app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
