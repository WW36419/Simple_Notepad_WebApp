import { Schema } from 'mongoose';

export interface IData {
    userId: Schema.Types.ObjectId;
    title: string;
    content: string;
}
 
export type Query<T> = {
    [key: string]: T;
};