import UserModel from '../models/UserModel';
import * as express from 'express';
import Auth from "../services/JwtToken";
class UserController {

    /**
     * @api {get} /user Get all users
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "firstname": "John",
     *       "lastname": "Doe"
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    public getAllUsers(req: express.Request, res: express.Response, next: express.NextFunction): void {
			UserModel
				.find({})
				.then((data)=> {
					res.status(200).json({data});
				})
				.catch((error: Error) => {
					res.status(500).json({
						error: error.message,
						errorStack: error.stack
					});
					next(error);
				});
    }

   /**
     * @api {get} /user/:_id Get one user
     * @apiName GetOneUser
     * @apiGroup User
     *
     * @apiParam {Number} _id Users _id.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          _id: "5c109cff93c91d9abcd8ff91",
     *           key: "EmfkE13Dmkdma#skda",
     *           source: "Twitter",
     *           createdAt: "2018-12-12T05:30:39.604Z",
     *           updatedAt: "2018-12-17T06:28:01.258Z"
     *      }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    public getUser(req: express.Request, res: express.Response, next: express.NextFunction): void {
			UserModel
				.findOne(
					req.params,
				)
				.then((data) => {
						res.status(200).json({ data });
				})
				.catch((error: Error) => {
						res.status(500).json({
								error: error.message,
								errorStack: error.stack
						});
						next(error);
				});
    }
    /**
     * @api {put} /user/:_id Update one user
     * @apiName UpdateOneUser
     * @apiGroup User
     *
     * @apiParam {Number} _id Users _id.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          _id: "5c109cff93c91d9abcd8ff91",
     *           key: "EmfkE13Dmkdma#skda",
     *           source: "Twitter",
     *           createdAt: "2018-12-12T05:30:39.604Z",
     *           updatedAt: "2018-12-17T06:28:01.258Z"
     *      }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    public updateUser(req: express.Request, res: express.Response, next: express.NextFunction): void {
        let updatePayload: any = {};
        req.body.token ? updatePayload.token = req.body.token: null;
        req.body.preferredLanguage ? updatePayload.preferredLanguage = req.body.preferredLanguage: null;
        UserModel.update(req.params,updatePayload)
        .then((update) => {
            res.status(200).json({ success: true });
        })
        .catch((error: Error) => {
            res.status(500).json({
                error: error.message,
                errorStack: error.stack
            });
            next(error);
        });
    }
}

export default new UserController();
