import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import Joi from 'joi';

/*
let notes = [
    {
        "id": "64549b6d32f53f030c89f6b0",
        "title": "Lista zakupów",
        "content": "- Chleb,\n- Ser\n- Szynka"
    },
    {
        "id": "64549b6d32f53f030c89f6b1",
        "title": "Numer do zapamiętania",
        "content": "23950189"
    }
]*/

class NoteController implements Controller {
    public path = '/api/note';
    public router = Router();
    public dataService = new DataService();
 
    constructor() {
        this.initializeRoutes();
    }
 
    private initializeRoutes() {
        this.router.get(`${this.path}s`, this.getAll);
        this.router.get(`${this.path}/:id`, this.getOne);
        this.router.get(`${this.path}s/:userId`, this.getForUser);
 
        this.router.post(`${this.path}`, this.addData);
        this.router.put(`${this.path}/:id`, this.changeNote);
 
        this.router.delete(`${this.path}s`, this.delAll);
        this.router.delete(`${this.path}/:id`, this.delOne);
    }
    
 
    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        const data = await this.dataService.query({});
        response.status(200).json(data);
    };
 
    private getOne = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const data = await this.dataService.getById(id);
        response.status(200).json(data);
    };

    private getForUser = async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request.params;
        const data = await this.dataService.getByUserId(userId);
        response.status(200).json(data);
    };
 
 
    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const {userId, title, content} = request.body;
        const schema = Joi.object({
            userId: Joi.string().required(), 
            title: Joi.string().required(), 
            content: Joi.string().required()
        });

        try {
            const note = await schema.validateAsync({userId, title, content});
            await this.dataService.createNote(note);
            response.status(200).json({"msg": "OK"});
        } catch (error) {
            console.log('Cannot create a note! ', error)
     
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    };
 
    private changeNote = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const {title, content} = request.body;

        try {
            await this.dataService.changeNote(id, title, content);
            response.status(200).json({"msg": "OK"});
        } catch (error) {
            console.log('Cannot change a note! ', error)
     
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    };

 
    private delAll = async (request: Request, response: Response, next: NextFunction) => {
        await this.dataService.deleteAll();
        response.status(200).json({"msg": "OK"});
    };
 
    private delOne = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteById(id);
        response.status(200).json({"msg": "OK"});
    };
 
}
export default NoteController;