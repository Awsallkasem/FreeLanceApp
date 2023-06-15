import { Controller, Get,Request, Response,Param } from '@nestjs/common';
import { paymentService } from './payments.service';

@Controller('api/payments/')
export class PaymentsController {
  constructor(private readonly paymentService: paymentService) {}

  @Get('create/:id')
  async createPayment(@Param('id') id :string,@Response() res,@Request() req): Promise<any> {
    try {
      const payment = await this.paymentService.createPayment(parseInt(id),req.body.user.id);
      for (var index = 0; index < payment.links.length; index++) {
        if (payment.links[index].rel === 'approval_url') {
            res.redirect(payment.links[index].href);
        }
    }      return payment;
    } catch (error) {
      console.error(error);
      throw new Error('Payment creation failed');
    }
  }
  @Get('success/:serviceId/:userId')
  async success(@Param('serviceId') serviceId :string,@Response( ) res,@Param('userId') userId:string){
      const payment=await this.paymentService.success(parseInt(userId),parseInt(serviceId));
return res.status(201).json({message:'done'});
  }
  @Get('cancel')
  async cancel(@Response() res){
      return res.status(200).jsone({message:'canceled'});
  
  }
    

}
