import { Schema, Document } from "mongoose";

export interface Item extends Document {
    name: string;
    description: string;
    image: string
}

export const ItemSchema = new Schema<Item>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
})
