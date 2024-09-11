import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    required: true,
    type: 'string',
    example: 'test@email.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
