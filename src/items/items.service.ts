import { CreateItemDto } from './dtos/create-item.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schemas/item.schema';
import { Model } from 'mongoose';
import { UpdateItemDto } from './dtos/update-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectModel('Item') private itemModel: Model<Item>) { }

    async create(body: CreateItemDto): Promise<Item> {
        const newItem = new this.itemModel(body);
        return newItem.save()
    }

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }

    async findOne(id: string): Promise<Item> {
        return this.itemModel.findById(id).exec();
    }

    async update(id: string, body: UpdateItemDto): Promise<Item> {
        return this.itemModel.findByIdAndUpdate(id, body, { new: true }).exec();
    }

    async partialUpdate(id: string, body: UpdateItemDto): Promise<Item> {
        const item = await this.itemModel.findById(id).exec();
        if (!item) {
            throw new NotFoundException(`Item com o ID ${id} não encontrado`);
        }

        Object.keys(body).forEach((key) => {
            if (body[key] !== undefined) {
                item[key] = body[key];
            }
        });

        return item.save();
    }

    async remove(id: string): Promise<void> {
        await this.itemModel.findByIdAndDelete(id).exec();
    }
}
