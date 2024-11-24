import { ApiPropertyOptional } from '@nestjs/swagger';
import { Tag } from '@prisma/client';

export class GetAllTagDto implements Tag {
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  id: number;
}
