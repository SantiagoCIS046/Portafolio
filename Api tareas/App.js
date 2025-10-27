import express from "express";
import { setupRoutes } from "./Rutas/rutas.js";

const app = express();
app.use(express.json());

setupRoutes(app);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
