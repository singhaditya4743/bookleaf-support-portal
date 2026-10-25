import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateReplyDto {
  @ApiProperty({
    example: 'Hi Ananya, your royalty of Rs 2,546 will be paid in the next payout cycle.',
    minLength: 2,
    maxLength: 5000,
  })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(2, 5000, { message: 'Reply must be between 2 and 5000 characters' })
  body: string;
}
