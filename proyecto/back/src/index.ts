import http from 'node:http';
import express, {type Request, type Response} from 'express';
import { AppRoutes } from './routes/routes.js';
import videojuegoRoutes from './routes/videojuego-routes/videojuego.routes.js';

const app = express();
import cors from 'cors';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(AppRoutes.routes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




/*app.get('/', (req: Request, res: Response) => {
    res.send('¡Holaaaaaaaa!');
});*/

/*const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('¡Hola desde Node.js + TypeScript (ESM)!\n');
});*/

//const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
/*server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost: ${PORT}`);
});*/

