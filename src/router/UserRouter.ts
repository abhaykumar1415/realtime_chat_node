import UserController from '../controllers/Users';
import { Router } from 'express';
import Auth from "../services/JwtToken";
/**
 * @export
 * @class UserRouter
 */
export default class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * @memberof UserRouter
     */
    public routes(): void {
        this.router.get('/', UserController.getAllUsers);
    }
}
