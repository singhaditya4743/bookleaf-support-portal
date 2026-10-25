import { Module } from '@nestjs/common';
import { BooksController } from '@/modules/author/books/books.controller';
import { BooksService } from '@/modules/author/books/books.service';
import { TicketsController } from '@/modules/author/tickets/tickets.controller';
import { TicketsService } from '@/modules/author/tickets/tickets.service';

@Module({
  controllers: [BooksController, TicketsController],
  providers: [BooksService, TicketsService],
})
export class AuthorModule {}
