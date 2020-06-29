import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) =>{
  return response.json({message: 'Hellow Go stack 🚀'});
});

app.listen(3333, () => {
  console.log('🚀 Server is ruinning on port 3333 🚀');
});

