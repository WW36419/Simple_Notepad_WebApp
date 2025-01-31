import {ISharedNote} from "../models/shared-note.model";
import SharedNoteModel from '../schemas/shared-note.schema';

class SharedNoteService {
   public async createShare(params: ISharedNote) {
       try {
           const sharedNoteModel = new SharedNoteModel(params);
           await sharedNoteModel.save();
       } catch (error) {
           console.error('Wystąpił błąd podczas tworzenia danych:', error);
           throw new Error('Wystąpił błąd podczas tworzenia danych');
       }
   }

   public async getByOwnerId(id: string) {
        try {
            const result = await SharedNoteModel.find({ ownerId: id });
            return result;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

   public async getByRecipientId(id: string) {
        try {
            const result = await SharedNoteModel.find({ recipientId: id });
            return result;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    public async getRecipientsByNoteId(id: string) {
        try {
            const result = await SharedNoteModel.find({ noteId: id }, {recipientId:1, _id:0});
            return result;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

   public async deleteOne(id: string) {
        try {
            await SharedNoteModel.deleteOne({ _id: id });
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych:', error);
            throw new Error('Wystąpił błąd podczas usuwania danych');
        }
    }

    public async deleteAll() {
        try {
            await SharedNoteModel.deleteMany();
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych:', error);
            throw new Error('Wystąpił błąd podczas usuwania danych');
        }
    }

    public async deleteWhereNote(id: string) {
        try {
            await SharedNoteModel.deleteMany({ noteId: id });
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych:', error);
            throw new Error('Wystąpił błąd podczas usuwania danych');
        }
    }

}

export default SharedNoteService;