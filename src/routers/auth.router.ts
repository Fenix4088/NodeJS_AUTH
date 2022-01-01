import { Router } from 'express';
import { check } from 'express-validator';
import { authMiddleware } from '../middleware/middleware';
import AuthController from '../controllers/auth.controller';

const router = Router();

enum Auth_Endpoints {
  REGISTARATION = '/registration',
  LOGIN = '/login',
  USERS = '/users',
}

router.post(
  `${Auth_Endpoints.REGISTARATION}`,
  ...[
    check('username', 'Username could not be empty string').notEmpty(),
    check('password', 'Password should be between 4 and 10 symbols').isLength({min: 4, max: 10}),
  ],
  (req, res) => AuthController.registaration(req, res)
);

router.post(`${Auth_Endpoints.LOGIN}`, (req, res) => AuthController.login(req, res));

router.get(`${Auth_Endpoints.USERS}`, authMiddleware, (req, res) => AuthController.users(req, res));

export default router;
