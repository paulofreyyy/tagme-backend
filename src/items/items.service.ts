import { CreateItemDto } from './dtos/create-item.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schemas/item.schema';
import { Model } from 'mongoose';

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

    async update(id: string, body: CreateItemDto): Promise<Item> {
        return this.itemModel.findByIdAndUpdate(id, body, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.itemModel.findByIdAndDelete(id).exec();
    }
}
