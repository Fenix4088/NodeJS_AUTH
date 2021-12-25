import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

enum Auth_Endpoints {
  REGISTARATION = '/registration',
  LOGIN = '/login',
  USERS = '/users'
}

router.post(`${Auth_Endpoints.REGISTARATION}`, (req, res) => AuthController.registaration(req, res));

router.post(`${Auth_Endpoints.LOGIN}`, (req, res) => AuthController.login(req, res));

router.get(`${Auth_Endpoints.USERS}`, (req, res) => AuthController.users(req, res));


export default router;
