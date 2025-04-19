const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hello world!');
});

console.log('Env Variable');
console.log(process.env.DATABASE_URL);

app.listen(3000, () => console.log('listening on 3000'));
