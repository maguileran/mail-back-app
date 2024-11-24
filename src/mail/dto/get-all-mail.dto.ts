import { ApiPropertyOptional } from '@nestjs/swagger';
import { Mail } from '@prisma/client';

export class GetAllMailDto implements Mail {
  @ApiPropertyOptional()
  id: number;
  @ApiPropertyOptional()
  createdAt: Date;
  @ApiPropertyOptional()
  updatedAt: Date;
  @ApiPropertyOptional()
  title: string;
  @ApiPropertyOptional()
  subject: string;
  @ApiPropertyOptional()
  body: string;
  @ApiPropertyOptional()
  isRead: boolean;
  @ApiPropertyOptional()
  from: string;
  @ApiPropertyOptional()
  to: string;
  @ApiPropertyOptional()
  tag: string;
}
