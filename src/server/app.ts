import cors from "cors";
import  express  from "express";
import  playersRoutes from './routes/player.router';

const app = express();
app.use(cors());
app.use(playersRoutes);

export default app;