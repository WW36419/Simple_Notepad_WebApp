import {IData, Query} from "../models/data.model";
import NoteModel from '../schemas/data.schema';

class DataService {
   public async createNote(noteParams: IData) {
       try {
           const dataModel = new NoteModel(noteParams);
           await dataModel.save();
       } catch (error) {
           console.error('Wystąpił błąd podczas tworzenia danych:', error);
           throw new Error('Wystąpił błąd podczas tworzenia danych');
       }
   }

   public async query(query: Query<number | string | boolean>) {
       try {
           const result = await NoteModel.find(query);
           return result;
       } catch (error) {
           throw new Error(`Query failed: ${error}`);
       }
   }

   public async getById(id: string) {
        try {
            const result = await NoteModel.findOne({ _id: id });
            return result;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    public async getByUserId(id: string) {
        try {
            const result = await NoteModel.find({ userId: id });
            return result;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    public async changeNote(id: string, _title: string, _content: string) {
        try {
            const result = await NoteModel.updateOne({_id: id}, {$set:{title: _title, content: _content}});
            return result;
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych:', error);
            throw new Error('Wystąpił błąd podczas usuwania danych');
        }
    }

   public async deleteData(query: Query<number | string | boolean>) {
       try {
           await NoteModel.deleteMany(query);
       } catch (error) {
           console.error('Wystąpił błąd podczas usuwania danych:', error);
           throw new Error('Wystąpił błąd podczas usuwania danych');
       }
   }

   public async deleteById(id: string) {
        try {
            await NoteModel.deleteOne({ _id: id });
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych:', error);
            throw new Error('Wystąpił błąd podczas usuwania danych');
        }
    }

    public async deleteAll() {
        try {
            await NoteModel.deleteMany();
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych:', error);
            throw new Error('Wystąpił błąd podczas usuwania danych');
        }
    }

}

export default DataService;