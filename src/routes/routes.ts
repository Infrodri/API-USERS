//nuestro archivo de rutas
import { UserRepository } from '@repositories/userRepositories';
import { UserService } from '@services/userService';
import { Router } from 'express';
import { IUserRepository, User } from 'types/UsersTypes';

const router = Router();


const userRepository: IUserRepository = new UserRepository();
const userService = new UserService(userRepository);

export default () => {
  // Definimos las rutas de la API
  router.get('/health', (req, res) => {
    res.send('Api is Healthy!!');
  });

  router.get('/users',  async (req, res) => {
    const users = await userService.findUsers();
    res.json(users);
  });

  router.post('/users', async (req, res) => {
    const newUser: User = req.body;
    const result = await userService.createUser(newUser);
    res.json(result);
    });



  // Aquí puedes agregar más rutas según sea necesario

  return router;
};