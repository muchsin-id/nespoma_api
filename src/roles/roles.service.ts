import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRoleDto): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async findOne(id: string): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateRoleDto): Promise<Role | null> {
    return this.prisma.role.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Role | null> {
    return this.prisma.role.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<Role | null> {
    return this.prisma.role.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
