import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { AdminTicketsQueryService } from '@/modules/admin/tickets/admin-tickets-query.service';
import { AdminTicketsService } from '@/modules/admin/tickets/admin-tickets.service';
import { AdminTicketDetailDto } from '@/modules/admin/tickets/dto/admin-ticket-detail.dto';
import { AdminTicketListDto } from '@/modules/admin/tickets/dto/admin-ticket-response.dto';
import { TicketFiltersDto } from '@/modules/admin/tickets/dto/ticket-filters.dto';
import { UpdateTicketDto } from '@/modules/admin/tickets/dto/update-ticket.dto';
import type { AuthUser } from '@/types/user.types';

@ApiTags('Admin - Tickets')
@Auth(Role.ADMIN)
@Controller('admin/tickets')
export class AdminTicketsController {
  constructor(
    private readonly ticketsService: AdminTicketsService,
    private readonly queryService: AdminTicketsQueryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Ticket queue with filters. Default sort: most urgent, oldest first' })
  @ApiOkResponse({ type: AdminTicketListDto })
  findAll(@Query() filters: TicketFiltersDto): Promise<AdminTicketListDto> {
    return this.queryService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ticket with author, book, replies and internal notes' })
  @ApiOkResponse({ type: AdminTicketDetailDto })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<AdminTicketDetailDto> {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Change status, category, priority or assignee' })
  @ApiOkResponse({ type: AdminTicketDetailDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTicketDto,
  ): Promise<AdminTicketDetailDto> {
    return this.ticketsService.update(id, dto);
  }

  @Post(':id/assign-to-me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign the ticket to the logged-in admin' })
  @ApiOkResponse({ type: AdminTicketDetailDto })
  assignToMe(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AdminTicketDetailDto> {
    return this.ticketsService.update(id, { assignedToId: user.id });
  }
}
