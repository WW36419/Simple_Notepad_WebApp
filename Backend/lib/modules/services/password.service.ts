import PasswordModel  from '../schemas/password.schema';
import bcrypt from 'bcrypt';

class PasswordService {
   public async createOrUpdate(data: any) {
       const result = await PasswordModel.findOneAndUpdate({ userId: data.userId }, { $set: { password: data.password } }, { new: true });
       if (!result) {
           const dataModel = new PasswordModel({ userId: data.userId, password: data.password });
           return await dataModel.save();
       }
       return result;
   }

   public async authorize(userId: string, password: string) {
       try {
            const passModel = await PasswordModel.findOne({ userId: userId });
            const check = await bcrypt.compare(password, passModel.password);
            if (check)
                return true;
            else
                return false;
       } catch (error) {
           console.error('Wystąpił błąd podczas tworzenia danych:', error);
           throw new Error('Wystąpił błąd podczas tworzenia danych');
       }

   }

   async hashPassword(password: string): Promise<string> {
       const hashedPassword = await bcrypt.hash(password, 10);
       console.log('hash', hashedPassword)
       return hashedPassword;
   }

}

export default PasswordService;