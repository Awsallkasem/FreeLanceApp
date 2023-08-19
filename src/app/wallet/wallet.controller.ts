import { Controller, Post, Body, Response, Request, UnauthorizedException, BadRequestException, UseFilters, Param, Get } from '@nestjs/common';

import { WalletService } from './wallet.service';
import { HttpExceptionFilter } from 'src/filters/global-exception.filter';


@UseFilters(HttpExceptionFilter)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @Get(':id/balance')
  async getBalance(@Param('id') id: number) {
    return this.walletService.getBalance(id);
  }

  @Post(':id/deposit')
  async deposit(@Param('id') id: number, @Body('amount') amount: number) {
    return this.walletService.deposit(id, amount);
  }

  
}