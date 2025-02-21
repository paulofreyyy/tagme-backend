import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateItemDto {
  @IsString({message: 'Name deve ser uma string'})
  @IsOptional()
  name: string;

  @IsString({message: 'Description deve ser uma string'})
  @IsOptional()
  description: string;

  @IsUrl({}, {message: 'Image deve ser uma URL válida'})
  @IsOptional()
  image: string;
}
