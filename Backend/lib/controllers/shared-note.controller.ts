import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import SharedNoteService from '../modules/services/shared-note.service';
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

class SharedNoteController implements Controller {
    public path = '/api/share';
    public router = Router();
    public dataService = new DataService();
    public shareService = new SharedNoteService();
 
    constructor() {
        this.initializeRoutes();
    }
 
    private initializeRoutes() {
        this.router.get(`${this.path}d/owner/:id`, this.getByOwner);
        this.router.get(`${this.path}d/recipient/:id`, this.getByRecipient);
        this.router.get(`${this.path}/recipients/:noteId`, this.getRecipientsByNote);
 
        this.router.post(`${this.path}`, this.addShare);
 
        this.router.delete(`${this.path}/all`, this.delAll);
        this.router.delete(`${this.path}/:id`, this.delOne);
        this.router.delete(`${this.path}s/:noteId`, this.delWhereNote);
    }
    

 
    private getByOwner = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const ownShares = await this.shareService.getByOwnerId(id);
        //console.log(ownShares)
        const uniqueShares = Array.from(
            new Map(ownShares.map(share => [share.noteId.toString(), share])).values()
        );
        const notes = await Promise.all(
            uniqueShares.map(share => this.dataService.getById(''+share.noteId))
        );
        response.status(200).json(notes); 
    };

    private getByRecipient = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const recShares = await this.shareService.getByRecipientId(id);
        const uniqueShares = Array.from(
            new Map(recShares.map(share => [share.noteId.toString(), share])).values()
        );
        let notes = await Promise.all(
            uniqueShares.map(share => this.dataService.getById(''+share.noteId))
        );
        response.status(200).json(notes);
    };

    private getRecipientsByNote = async (request: Request, response: Response, next: NextFunction) => {
        const { noteId } = request.params;
        const shares = await this.shareService.getRecipientsByNoteId(noteId)
        response.status(200).json(shares);
    };
 
 
    private addShare = async (request: Request, response: Response, next: NextFunction) => {
        const {ownerId, recipientId, noteId} = request.body;
        const schema = Joi.object({
            ownerId: Joi.string().required(), 
            recipientId: Joi.string().required(), 
            noteId: Joi.string().required()
        });
        try {
            const share = await schema.validateAsync({ownerId, recipientId, noteId});
            await this.shareService.createShare(share);
            response.status(200).json({"msg": "OK"});
        } catch (error) {
            console.log('Cannot create a share! ', error)
     
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    };
 
 
    private delAll = async (request: Request, response: Response, next: NextFunction) => {
        await this.shareService.deleteAll();
        response.status(200).json({"msg": "OK"});
    };
 
    private delOne = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.shareService.deleteOne(id);
        response.status(200).json({"msg": "OK"});
    };

    private delWhereNote = async (request: Request, response: Response, next: NextFunction) => {
        const { noteId } = request.params;
        await this.shareService.deleteWhereNote(noteId);
        response.status(200).json({"msg": "OK"});
    };
 
}
export default SharedNoteController;