import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    example: 'Checked with finance, payout is scheduled for next cycle.',
    minLength: 2,
    maxLength: 2000,
  })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(2, 2000, { message: 'Note must be between 2 and 2000 characters' })
  body: string;
}
