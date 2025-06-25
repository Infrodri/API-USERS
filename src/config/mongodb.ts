import mongoose from "mongoose";
import dotenv from "dotenv";
import initializeSettings from "@scripts/initSettings";

dotenv.config();

const mongoDbURL = process.env.MONGODB_URL_STRING as string;

export default (async () => {
  try {
    await mongoose.connect(mongoDbURL);
    console.log("Mongodb Connected!!!");
    
    // Inicializar configuraciones por defecto
    await initializeSettings();
  } catch (error) {
    console.log("error :>> ", error);
    process.exit(1);
  }
})();
