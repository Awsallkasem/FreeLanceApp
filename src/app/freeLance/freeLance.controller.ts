import { Controller, Post, Body,Response,Request, UnauthorizedException, BadRequestException, Param, Get, UseFilters } from '@nestjs/common';
import { Service } from 'src/database/models/service.model';
import { FreeLanceService } from 'src/app/freeLance/freeLance.service';
import { FreelanceCategory } from 'src/database/models/Publish.model';
import { HttpExceptionFilter } from 'src/filters/global-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('api/freeLace/')

export class FreeLanceController {
    constructor(private readonly freeLanceService: FreeLanceService) { }

@Get('getAllPost')
async getAllPost(@Response() res){
  const posts=await this.freeLanceService.getAllPost();

  return res.status(200).json({posts:posts});
}

@Get('getPostAboutInterstes')
async getPostInterstes(@Response() res){

}


@Get('getAllPostByCategory/:category')
async getAllPostByCategory(@Param() category:string,@Response() res){

  const posts=await this.freeLanceService.getAllPostByCategory(category);
  return res.status(200).json({posts:posts});
}

    @Post('addService/:id')
    async addService(@Param('id') id: string,@Body() service: Service,@Request() req,@Response() res) {
      
            const createService = new Service(service);
            const newService = await this.freeLanceService.addService(createService.dataValues,req.body.user.id,parseInt(id));
            return res.status(201).json({ message: 'Service createred secussefully' ,service:newService});
        }

@Get('checkMyService')
async checkMyService(@Request() req,@Response() res){

  const myService=await this.freeLanceService.checkMyService(req.body.user.id);
return res.status(200).json({service:myService});
}
@Get('showAcceptedServices')
async showAcceptedServices(@Request() req, @Response() res){
  const services=await this.freeLanceService.showAcceptedServices(req.body.user.id);
  return res.status(200).json({services:services});
}

@Get('paymentinYear/:year')
async paymentInYear(@Param('year') year:string,@Response() res){
   const payments=await this.freeLanceService.showYearMoney(parseInt(year));
   return res.status(200).json({payment:payments});
}



@Get('paymentinMonth/:month')
async paymentInMont(@Param('month') month:string,@Response() res){
   const payments=await this.freeLanceService.showMonthMony(parseInt(month));
   return res.status(200).json({payment:payments});
}

}