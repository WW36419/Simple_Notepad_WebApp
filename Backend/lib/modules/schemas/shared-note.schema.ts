import { Schema, model } from 'mongoose';
import { ISharedNote } from '../models/shared-note.model';


const SharedNoteSchema = new Schema<ISharedNote>({
    ownerId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    recipientId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    noteId: { type: Schema.Types.ObjectId, ref: 'note', required: true },
});
export default model<ISharedNote>('Shared Note', SharedNoteSchema);