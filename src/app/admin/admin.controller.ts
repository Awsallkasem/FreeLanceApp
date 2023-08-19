import { Controller, Param, Request,Response, Get, Put, Delete, UnauthorizedException, NotFoundException, UseFilters, Post, Body } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { AdminService } from 'src/app/admin/admin.service';
import { HttpExceptionFilter } from 'src/filters/global-exception.filter';


@UseFilters(HttpExceptionFilter)
@Controller('api/admin')

export class AdminContoller {
  constructor(private readonly adminService: AdminService) { }
  @Get('/ShowAllRequest')
  async getAllRequest(@Response() res): Promise<any> {
    const requests = await this.adminService.showAllRequest();
    if (!requests) {
      throw new NotFoundException;
    }
    return res.status(200).json({ data: requests });
  
  }

  @Put('/acceptRequest/:id')
  async acceptRequest(@Param('id') id: string, @Response() res) {

    const accepted = await this.adminService.acceptRequest(parseInt(id));
    return res.status(202).json({ data: accepted });
  }
  @Put('/rejectRequest/:id')
  async rejectRequest(@Param('id') id: string, @Response() res) {

    const rejected = await this.adminService.rejectRequest(parseInt(id));
    return res.status(200).json({ data: rejected });
  }

  @Put('/blockUser/:id')
  async blockUser(@Param('id') id: string, @Response() res) {
    
      const blocked = await this.adminService.blockUser(parseInt(id));
      return res.status(200).json({ data: blocked });
  }
  @Post('updateLicnse')
  async updateLicnse(@Body('amount') amount:number,@Response() res){
const updated =await this.adminService.updateLicnces(amount);
return res.status(200).json({message:'updated'})

  }
}
