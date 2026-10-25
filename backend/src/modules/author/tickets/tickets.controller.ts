import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { CreateTicketDto } from '@/modules/author/tickets/dto/create-ticket.dto';
import {
  AuthorTicketDetailDto,
  AuthorTicketSummaryDto,
} from '@/modules/author/tickets/dto/ticket-response.dto';
import { TicketsService } from '@/modules/author/tickets/tickets.service';
import type { AuthUser } from '@/types/user.types';

@ApiTags('Author - Tickets')
@Auth(Role.AUTHOR)
@Controller('author/tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Raise a new support query' })
  @ApiCreatedResponse({ type: AuthorTicketDetailDto })
  create(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateTicketDto,
  ): Promise<AuthorTicketDetailDto> {
    return this.ticketsService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List the logged-in author’s tickets' })
  @ApiOkResponse({ type: [AuthorTicketSummaryDto] })
  findAll(@CurrentUser() user: AuthUser): Promise<AuthorTicketSummaryDto[]> {
    return this.ticketsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket with its replies' })
  @ApiOkResponse({ type: AuthorTicketDetailDto })
  findOne(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AuthorTicketDetailDto> {
    return this.ticketsService.findOne(user.id, id);
  }
}
