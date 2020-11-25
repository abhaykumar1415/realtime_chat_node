import UserController from '../controllers/Users';
import { Router } from 'express';
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
        this.router.get('/:_id', UserController.getAllUsers);
        this.router.get('/:_id', UserController.getUser);
        this.router.get('/login/:name', UserController.getUser);
        this.router.get('/:_id/:role', UserController.getAllUsers);
    }
}
