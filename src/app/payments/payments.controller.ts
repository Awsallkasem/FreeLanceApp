import { Get, Request, Response, Param, UseFilters, BadRequestException, Query } from '@nestjs/common';
import { paymentService } from './payments.service';
import { Controller, Post, Body } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/global-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('api/payments/')
export class PayPalController {
  constructor(private readonly payPalService: paymentService) { }

  @Get('receive-money/:packgId')
  async receiveMoney(@Param('packgId') packgId, @Response() res, @Request() req) {
    if (!packgId) {
      throw new BadRequestException('packgId is required');
    }
    res.redirect(await this.payPalService.receiveMoney(parseInt(packgId), req.body.user.id));
    return { message: 'Payment received successfully.' };
  }

  @Post('send-money')
  async sendMoney(@Body('amount') amount: number,@Body('point') point: number, @Response() res, @Request() req) {
    if (!amount && !point) {
      throw new BadRequestException('amount is required');
    }
    const message = await this.payPalService.sendMoney(amount,point, req.body.user.id);
    return res.status(200).send({ message: message });
  }
  @Get('success')
  async success(@Response() res, @Request() req) {
    const payment = await this.payPalService.success(req);
    return res.status(201).json({ message: 'done' });
  }

  
  @Get('showPackgs')
  async showPackgs(){
    return this.payPalService.showPackgs();
  }
}
