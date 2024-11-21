import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [MailModule, PrismaModule, TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
