import { Controller, Param, Response, Get, Put, Delete, UnauthorizedException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { AdminService } from 'src/services/admin.service';



@Controller('api/admin')

export class AdminContoller {
  constructor(private readonly adminService: AdminService) { }
  @Get('/ShowAllRequest')
  async getAllRequest(@Response() res): Promise<any> {
    const requests = await this.adminService.showAllRequest();
    if (!requests) {
      return res.status(404).json({ message: 'there no requests' });
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
    try {
      const blocked = await this.adminService.blockUser(parseInt(id));
      return res.status(200).json({ data: blocked });
    } catch (err) {
      return res.status(403).json({ message: err.message });
    }


  }
}
