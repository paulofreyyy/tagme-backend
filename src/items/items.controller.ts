import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dtos/create-item.dto';
import { Item } from './schemas/item.schema';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: CreateItemDto): Promise<Item> {
        const item = await this.itemsService.create(body);
        return item;
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<Item> {
        return this.itemsService.findOne(id);
    }

    @Get()
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Body() body: CreateItemDto, @Param('id') id: string): Promise<Item> {
        return this.itemsService.update(id, body);
    }

    @Get()
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string): Promise<void> {
        return this.itemsService.remove(id);
    }
}
