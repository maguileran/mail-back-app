import { ApiProperty } from '@nestjs/swagger';

export class CreateMailDto {
  @ApiProperty()
  subject: string;
}
