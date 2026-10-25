import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUUID, Length, MaxLength } from 'class-validator';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

export class CreateTicketDto {
  @ApiPropertyOptional({
    format: 'uuid',
    description: 'One of your books. Leave empty for a general / account level query.',
  })
  @IsOptional()
  @IsUUID('4', { message: 'bookId must be a valid book id' })
  bookId?: string;

  @ApiProperty({ example: 'Royalty not received', minLength: 5, maxLength: 150 })
  @Transform(trim)
  @IsString()
  @Length(5, 150, { message: 'Subject must be between 5 and 150 characters' })
  subject: string;

  @ApiProperty({
    example: 'My book shows Rs 2546 earned but nothing has been paid so far.',
    minLength: 20,
    maxLength: 5000,
  })
  @Transform(trim)
  @IsString()
  @Length(20, 5000, { message: 'Description must be between 20 and 5000 characters' })
  description: string;

  @ApiPropertyOptional({ example: 'royalty-statement.pdf', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  attachmentName?: string;
}
