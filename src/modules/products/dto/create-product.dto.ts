import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
    type: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  value: number;

  @ApiProperty({
    type: 'number',
    required: false,
    default: 1,
  })
  @IsNumber()
  @Type(() => Number)
  category_id: number = 1;

  @ApiProperty({
    type: 'string[]',
    maximum: 6,
    minimum: 1,
    required: true,
  })
  @IsArray()
  @ArrayMaxSize(6)
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  images: string[];

  @ApiProperty({
    required: false,
    type: 'number',
    examples: ['mm-dd-yyyy', 'yyyy-mm-dd', 'mm/dd/yyyy', 'yyyy/mm/dd'],
  })
  @ValidateIf((object, value) => value === null)
  @IsDate()
  @Transform((value) => transformDate(value.value))
  date: Date;
}
