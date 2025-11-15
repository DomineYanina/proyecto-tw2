import express, {type Request, type Response} from 'express';
import { AppRoutes } from './routes/routes.js';

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


