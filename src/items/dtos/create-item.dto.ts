import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateItemDto{
    @IsString({ message: 'Nome deve ser uma string válida'})
    @IsNotEmpty({message: 'Name é obrigatório'})
    name: string;

    @IsString({ message: 'Description deve ser uma string válida'})
    @IsNotEmpty({message: 'Description é obrigatório'})
    description:string;

    @IsUrl({},{ message: 'Imagem deve ser uma URL válida'})
    @IsNotEmpty({message: 'Image é obrigatório'})
    image: string;
}