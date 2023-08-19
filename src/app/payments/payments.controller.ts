 import {  Get,Request, Response,Param, UseFilters, BadRequestException } from '@nestjs/common';
 import { paymentService } from './payments.service';
 import { Controller, Post, Body } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/global-exception.filter';

@UseFilters(HttpExceptionFilter)
 @Controller('api/payments/')
export class PayPalController {
  constructor(private readonly payPalService: paymentService) {}

  @Get('receive-money/:amount')
  async receiveMoney(@Param('amount') amount,@Response() res,@Request() req ) {
    if(!amount){
      throw new BadRequestException('amount is required');
    }
   res.redirect( await this.payPalService.receiveMoney(parseInt(amount),1));
    return { message: 'Payment received successfully.' };
  }

  @Get('send-money/:amount')
  async sendMoney(@Param('amount') amount,@Response() res,@Request() req ) {
    if(!amount){
      throw new BadRequestException('amount is required');
    }
 const message=   await this.payPalService.sendMoney(parseInt(amount),3 );
    return res.status(200).send({ message:message });
  }
  @Get('success')
  async success(@Response( ) res,@Request() req){
      const payment=await this.payPalService.success(req);
return res.status(201).json({message:'done'});
  }
}
