import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  create({ name }: CreateTagDto) {
    return this.prisma.tag.create({
      data: { name },
    });
  }

  findAll() {
    return this.prisma.tag.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const result = await this.prisma.tag.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      throw new NotFoundException('No tag was found');
    }
    return result;
  }

  async update(id: number, { name }: UpdateTagDto) {
    const updatedTag = await this.prisma.tag.update({
      where: {
        id,
      },
      data: {
        name: name,
      },
    });
    if (!updatedTag) {
      throw new NotFoundException('No tag was updated');
    }
    return updatedTag;
  }

  async remove(id: number) {
    try {
      const removedTag = await this.prisma.tag.delete({
        where: {
          id,
        },
      });
      return removedTag;
    } catch (e) {
      throw new NotFoundException('No tag was found', e);
    }
  }
}
