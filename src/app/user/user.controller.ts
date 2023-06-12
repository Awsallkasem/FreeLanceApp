import { Controller, Post, Body, Response, Request, UnauthorizedException, BadRequestException, Get, Param, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { Published } from 'src/database/models/Publish.model';
import { HttpExceptionFilter } from 'src/filters/global-exception.filter';



@UseFilters(HttpExceptionFilter)
@Controller('api/user')
export class UserController {
  constructor(private readonly userservice: UserService) { }

  @Post('newPost')
  async newPost(@Body() post: Published, @Request() req, @Response() res): Promise<{ message: string, post: any }> {
        const createPublication = new Published(post);
      const newPublication = await this.userservice.createPost(createPublication.dataValues, req.body.user);
      return res.status(201).json({ message: 'New post uploaded', post: newPublication });
  
    }
  @Get('myPosts')
  async getMyPost(@Request() req,@Response() res ) {
    const myPost= await this.userservice.getMyPost(req.body.user.id);
    return res.status(200).json({myPost:myPost});

  }
@Get('servicesOnPost/:id')
async servicesOnPost(@Param('id') id:string,@Response() res){
  const service= await this.userservice.servicesOnPost(parseInt(id));
  return res.status(200).json({service:service});

}

@Get('getFreeLanceInfo/:id')
async freeLanceInfo(@Param('id') id:string,@Response() res){

  const freeLanceInfo= await this.userservice.showFreeLanceinfo(parseInt(id));
return res.status(200).json({freeLanceInfo:freeLanceInfo});
}


@Post('rateFreeLance/:id')
async rateFreeLance(@Param('id') id:string,@Body('rate') rate:number,@Request() req,@Response() res ){
  const userId=req.body.user.id;
const rateFreeLance=await this.userservice.rateFreeLance(parseInt(id),userId,rate);
return res.status(200).json({rate:rateFreeLance});
}

@Post('acceptRequest/:id')
async acceptRequest(@Param('id') id:string,@Response() res){
const service=await this.userservice.acceptRequest(parseInt(id));
return res.status(200).json({service:service});
}

}
