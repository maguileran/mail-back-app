import { Mail } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import {
  UpdateMailReadStatusDto,
  UpdateMailTagDto,
} from './dto/update-mail.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MailService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMailDto: CreateMailDto): Promise<Mail> {
    const createdMail = await this.prisma.mail.create({
      data: { ...createMailDto },
    });
    if (!createdMail) {
      throw new NotFoundException('No mail was created');
    }
    return createdMail;
  }

  async findAll(): Promise<Mail[]> {
    return await this.prisma.mail.findMany({
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<Mail> {
    return await this.prisma.mail.findUnique({
      where: {
        id,
      },
    });
  }

  async updateReadStatus(
    id: number,
    updateMailReadStatusDto: UpdateMailReadStatusDto,
  ): Promise<Mail> {
    const updatedMail = await this.prisma.mail.update({
      data: {
        isRead: updateMailReadStatusDto.isRead,
      },
      where: {
        id,
      },
    });
    if (!updatedMail) {
      throw new NotFoundException('No email was updated');
    }
    return updatedMail;
  }

  async updateMailTag(
    id: number,
    updateMailTagDto: UpdateMailTagDto,
  ): Promise<Mail> {
    const selectedTags = await this.prisma.tag.findMany({
      where: {
        id: {
          in: updateMailTagDto.tags,
        },
      },
    });

    if (!selectedTags.length) {
      return await this.prisma.mail.update({
        where: { id },
        data: {
          tags: {
            deleteMany: {
              mailId: id,
            },
          },
        },
      });
    }
    const updatedMail = await this.prisma.mail.update({
      where: { id },
      data: {
        tags: {
          connectOrCreate: selectedTags.map(
            ({ id: tagId, name }: { id: number; name: string }) => ({
              create: {
                tag: {
                  connect: {
                    id: tagId,
                    name,
                  },
                },
              },
              where: {
                mailId_tagId: {
                  tagId,
                  mailId: id,
                },
              },
            }),
          ),
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    if (!updatedMail) {
      throw new NotFoundException('No email was updated');
    }
    return updatedMail;
  }

  async remove(id: number): Promise<Mail> {
    try {
      const tagsIds = await this.prisma.tagsOnMails.findMany({
        where: {
          mailId: {
            equals: id,
          },
        },
        select: {
          tagId: true,
        },
      });

      await this.prisma.tagsOnMails.deleteMany({
        where: {
          mailId: {
            equals: id,
          },
          tagId: {
            in: tagsIds.map(({ tagId }: { tagId: number }) => tagId),
          },
        },
      });

      const removedMail = await this.prisma.mail.delete({
        where: { id },
      });

      return removedMail;
    } catch (e) {
      throw new NotFoundException({
        cause: e.meta.cause,
        message: 'Not mail was found',
      });
    }
  }
}
