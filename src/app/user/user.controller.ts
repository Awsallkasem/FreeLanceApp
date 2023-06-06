import { Controller, Post, Body, Response, Request, UnauthorizedException, BadRequestException, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Published } from 'src/database/models/Publish.model';


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
  async getMyPost(@Request() req) {
    return await this.userservice.getMyPost(req.body.user.id);
  }
@Get('servicesOnPost/:id')
async servicesOnPost(@Param('id') id:string){
  return await this,this.userservice.servicesOnPost(parseInt(id));
}

@Get('getFreeLanceInfo/:id')
async freeLanceInfo(@Param('id') id:string){
  
}

}
