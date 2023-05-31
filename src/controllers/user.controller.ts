import { Controller, Post, Body, Response, Request, UnauthorizedException, BadRequestException, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Published } from 'src/database/models/Publish.model';


@Controller('api/user')
export class UserController {
  constructor(private readonly userservice: UserService) { }

  @Post('newPost')
  async newPost(@Body() post: Published, @Request() req, @Response() res): Promise<{ message: string, post: any }> {
    try {
      const createPublication = new Published(post);
      const newPublication = await this.userservice.createPost(createPublication.dataValues, req.body.user);
      return res.status(201).json({ message: 'New post uploaded', post: newPublication });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  @Get('myPosts')
  async getMyPost(@Request() req) {
    return await this.userservice.getMyPost(req.body.user.id);
  }


}
