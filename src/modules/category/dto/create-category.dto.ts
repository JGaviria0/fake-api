import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
