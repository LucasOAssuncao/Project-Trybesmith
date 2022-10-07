import { Router } from 'express';
import UserController from '../controller/user.controller';
import ValidateLogin from '../middlewares/validateLogin';
import ValidateUser from '../middlewares/validateUser';

const router = Router();
const validateLogin = new ValidateLogin();
const validateUser = new ValidateUser();
const userController = new UserController();

router.post(
  '/users',
  validateUser.validateName,
  validateUser.validateClasse,
  validateUser.validateLevel,
  validateUser.validatePassword,
  userController.create,
);
router.post('/login', validateLogin.validateLogin, userController.login);
export default router;
