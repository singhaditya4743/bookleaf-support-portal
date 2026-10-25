import { ApiProperty } from '@nestjs/swagger';
import { AuthorBook } from '@/types/book.types';

export class AuthorBookDto implements AuthorBook {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'BK005' })
  bookCode: string;

  @ApiProperty({ example: 'Between Two Temples' })
  title: string;

  @ApiProperty({ type: String, nullable: true, example: '978-93-5XXXX-05-9' })
  isbn: string | null;

  @ApiProperty({ type: String, nullable: true, example: 'Historical Fiction' })
  genre: string | null;

  @ApiProperty({ type: Date, nullable: true })
  publicationDate: Date | null;

  @ApiProperty({ example: 'Published & Live' })
  status: string;

  @ApiProperty({ type: Number, nullable: true, example: 425 })
  mrp: number | null;

  @ApiProperty({ type: Number, nullable: true, example: 38 })
  royaltyPerCopy: number | null;

  @ApiProperty({ example: 67 })
  copiesSold: number;

  @ApiProperty({ example: 2546 })
  royaltyEarned: number;

  @ApiProperty({ example: 0 })
  royaltyPaid: number;

  @ApiProperty({ example: 2546 })
  royaltyPending: number;

  @ApiProperty({ type: Date, nullable: true })
  lastPayoutAt: Date | null;

  @ApiProperty({ type: [String], example: ['Amazon India', 'BookLeaf Store'] })
  availableOn: string[];
}
