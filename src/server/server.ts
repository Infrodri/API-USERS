import routes from "@routes/routes";
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", routes());

/**
 * Middleware para el manejo centralizado de errores.
 * Se activa cuando cualquier controlador asíncrono lanza un error.
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Ocurrió un error en el servidor.",
    error: err.message,
  });
});

export default app;
