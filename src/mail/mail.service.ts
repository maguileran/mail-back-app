import { Mail } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MailService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMailDto: CreateMailDto) {
    return 'This action adds a new mail';
  }

  async findAll(): Promise<Mail[]> {
    const data = await this.prisma.mail.findMany();
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
