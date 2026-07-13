import express from "express";
import { errorHandler } from "./middlewares/error-handler.js";
import { routers } from "./routes/index.js";

const app = express();

app.use(express.json());

app.use(routers);

app.use(errorHandler);

export { app };
