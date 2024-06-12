import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsCuid } from '@custom/validators';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
    required: false,
  })
  @IsString()
  name: string;

  @ApiProperty()
  @IsCuid()
  roleId: string;

  @ApiProperty()
  @IsOptional()
  @IsCuid()
  modified_by?: string;
}
