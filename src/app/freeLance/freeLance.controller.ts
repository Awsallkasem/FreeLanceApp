import { Controller, Post, Body,Response,Request, UnauthorizedException, BadRequestException, Param } from '@nestjs/common';
import { Service } from 'src/database/models/service.model';
import { FreeLanceService } from 'src/app/freeLance/freeLance.service';

@Controller('api/freeLace/')

export class FreeLanceController {
    constructor(private readonly freeLanceService: FreeLanceService) { }


    @Post('addService/:id')
    async addService(@Param('id') id: string,@Body() service: Service,@Request() req,@Response() res) {
      
            const createService = new Service(service);
            const newService = await this.freeLanceService.addService(createService.dataValues,req.body.user.id,parseInt(id));
            return res.status(201).json({ message: 'Service createred secussefully' ,service:newService});
        }
}