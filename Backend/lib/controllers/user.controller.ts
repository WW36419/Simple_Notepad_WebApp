import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import {auth} from '../middlewares/auth.middleware';
import {admin} from '../middlewares/admin.middleware';
import UserService from "../modules/services/user.service";
import PasswordService from "../modules/services/password.service";
import TokenService from "../modules/services/token.service";

class UserController implements Controller {
   public path = '/api/user';
   public router = Router();
   private userService = new UserService();
   private passwordService = new PasswordService();
   private tokenService = new TokenService();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
    this.router.get(`${this.path}s`, this.getUsers);
       this.router.get(`${this.path}name/:userId`, this.getUsernameById);

       this.router.post(`${this.path}/create`, this.createNewOrUpdate);
       this.router.post(`${this.path}/auth`, this.authenticate);
       //this.router.patch(`${this.path}/change-password/:userId`, auth, this.changePassword);

       this.router.delete(`${this.path}/logout/:userId`, auth, this.removeHashSession);
   }


   private getUsers = async (request: Request, response: Response, next: NextFunction) => {
        const users = await this.userService.getAllUsers();
        response.status(200).json(users);
   }
    
   private getUsernameById = async (request: Request, response: Response, next: NextFunction) => {
        const {userId} = request.params
        const user = await this.userService.getById(userId);
        response.status(200).json({"name": user.name});
    };


   private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
        const userData = request.body;
        try {
            const user = await this.userService.createNewOrUpdate(userData);
            if (userData.password) {
                const hashedPassword = await this.passwordService.hashPassword(userData.password)
                await this.passwordService.createOrUpdate({
                    userId: user._id,
                    password: hashedPassword
                });
            }
            response.status(200).json(user);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Bad request', value: error.message});
        } 
    };

   private authenticate = async (request: Request, response: Response, next: NextFunction) => {
       const {login, password} = request.body;
       try {
           const user = await this.userService.getByEmailOrName(login);
           if (user) {
                const passCheck = await this.passwordService.authorize(user.id, password);
                if (passCheck) {
                    const token = await this.tokenService.create(user);
                    console.log("Authorization succeded!")
                    response.status(200).json(this.tokenService.getToken(token));
                } else {
                    console.log("Authorization failed!")
                    response.status(401).json({error: 'Wrong password'}); 
                }
                    
           } else {
                console.log("Unauthorized!")
                response.status(401).json({error: 'Unauthorized'});
           }
       } catch (error) {
           console.error(`Validation Error: ${error.message}`);
           response.status(401).json({error: 'Unauthorized'});
       }
   };

   private changePassword = async (request: Request, response: Response, next: NextFunction) => {
        const {password, newPassword} = request.body;
        const {userId} = request.params

        try {
            const checkPassword = await this.passwordService.authorize(userId, password)
            if (!checkPassword)
                response.status(401).json({error: 'Wrong password'});
            else {
                const hashedPassword = await this.passwordService.hashPassword(newPassword)
                const data = {
                    userId: userId,
                    password: hashedPassword
                }
                await this.passwordService.createOrUpdate(data);
                response.status(200).json({"Old password": password, "New password": newPassword})
            }
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };
 
   private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
       const {userId} = request.params
       try {
           const result = await this.tokenService.remove(userId);
           response.status(200).send(result);
       } catch (error) {
           console.error(`Validation Error: ${error.message}`);
           response.status(401).json({error: 'Unauthorized'});
       }
    };
   }

export default UserController;