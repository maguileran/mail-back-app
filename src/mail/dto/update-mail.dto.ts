import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMailTagDto {
  @ApiPropertyOptional()
  tags: [number];
}

export class UpdateMailReadStatusDto {
  @ApiPropertyOptional()
  isRead: boolean;
}
