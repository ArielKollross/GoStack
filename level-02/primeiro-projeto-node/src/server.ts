import express from 'express';

const app = express();

app.get('/', (request, response) =>{
  return response.json({message: 'Hellow Go stack 🚀'});
});

app.listen(3333, () => {
  console.log('🚀 Server is ruinning on port 3333 🚀');
});

