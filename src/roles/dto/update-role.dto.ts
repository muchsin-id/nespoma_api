import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  deletedAt?: string;

  @ApiPropertyOptional()
  modifiedBy?: string;
}
