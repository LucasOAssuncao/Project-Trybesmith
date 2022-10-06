import { Router } from 'express';
import UserController from '../controller/user.controller';
import ValidateLogin from '../middlewares/validateLogin';

const router = Router();
const validateLogin = new ValidateLogin();
const userController = new UserController();

router.post('/users', userController.create);
router.post('/login', validateLogin.validateLogin, userController.login);
export default router;