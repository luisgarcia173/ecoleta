import express, { response } from 'express';

const app = express();

app.get('/users', (req, resp) => {
  console.log('Users List');

  resp.json([
    'Luis',
    'Carlos',
    'Nascimento',
    'Garcia',
    'Yuri'
  ]);
});

app.listen(3333); 