import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { BooksService } from '@/modules/author/books/books.service';
import { AuthorBookDto } from '@/modules/author/books/dto/author-book.dto';
import type { AuthUser } from '@/types/user.types';

@ApiTags('Author - Books')
@Auth(Role.AUTHOR)
@Controller('author/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'List the logged-in author’s books with royalty details' })
  @ApiOkResponse({ type: [AuthorBookDto] })
  findAll(@CurrentUser() user: AuthUser): Promise<AuthorBookDto[]> {
    return this.booksService.findAll(user.id);
  }
}
