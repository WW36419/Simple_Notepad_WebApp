import { Schema } from 'mongoose';

export interface ISharedNote {
   ownerId: Schema.Types.ObjectId;
   recipientId: Schema.Types.ObjectId;
   noteId: Schema.Types.ObjectId;
}