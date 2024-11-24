import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import {
  UpdateMailTagDto,
  UpdateMailReadStatusDto,
} from './dto/update-mail.dto';
import { Mail } from '@prisma/client';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllMailDto } from './dto/get-all-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  create(@Body() createMailDto: CreateMailDto) {
    return this.mailService.create(createMailDto);
  }

  @ApiResponse({
    type: GetAllMailDto,
    status: 200,
    description: 'All user`s mails received',
    isArray: true,
  })
  @Get()
  findAll(): Promise<Mail[]> {
    return this.mailService.findAll();
  }

  @ApiResponse({
    type: GetAllMailDto,
    status: 200,
    description: 'Get one user`s mail',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Mail> {
    return this.mailService.findOne(+id);
  }

  @Patch(':id')
  updateReadStatus(
    @Param('id') id: string,
    @Body() updateMailReadStatusDto: UpdateMailReadStatusDto,
  ) {
    return this.mailService.updateReadStatus(+id, updateMailReadStatusDto);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateMailTagDto: UpdateMailTagDto) {
    return this.mailService.updateMailTag(+id, updateMailTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailService.remove(+id);
  }
}
