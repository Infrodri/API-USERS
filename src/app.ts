import "module-alias/register";
import dotenv from "dotenv";

// Cargar variables de entorno antes que cualquier otro import
dotenv.config();

import app from "@server/server";
import "@config/mongodb";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
