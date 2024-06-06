import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsString()
  roleId: string;

  // @IsOptional()
  // role?: CreateRoleDto;

  @ApiProperty()
  @IsOptional()
  @IsString()
  modifiedBy?: string;
}
