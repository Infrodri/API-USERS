//levantar servidor


import app from '@server/server';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});