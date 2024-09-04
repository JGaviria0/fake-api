import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { transformDate } from 'src/utils/transformDate';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  value: number;

  @IsNumber()
  @Type(() => Number)
  category_id: number = 1;

  @IsArray()
  @ArrayMaxSize(6)
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  images: string[];

  @ValidateIf((object, value) => value === null)
  @IsDate()
  @Transform((value) => transformDate(value.value))
  date: Date;
}
