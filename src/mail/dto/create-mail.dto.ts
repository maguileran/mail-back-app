import { ApiProperty } from '@nestjs/swagger';

export class CreateMailDto {
  @ApiProperty()
  body: string;
  @ApiProperty()
  from: string;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  to: string;
}
