import { Schema, model } from 'mongoose';
import { IData } from "../models/data.model";

export const DataSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user'},
    title: { type: String, required: true },
    content: { type: String, required: true },
});

export default model<IData>('Note', DataSchema);