import { Controller, Post, Body, Response, Request, UnauthorizedException, BadRequestException, Get, Param, UseFilters, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Posts } from 'src/database/models/post.model';
import { HttpExceptionFilter } from 'src/filters/global-exception.filter';



@UseFilters(HttpExceptionFilter)
@Controller('api/user')
export class UserController {
  constructor(private readonly userservice: UserService) { }

  @Post('newPost')
  async newPost(@Body() post: Posts, @Request() req, @Response() res): Promise<{ message: string, post: any }> {
    const createPublication = new Posts(post);
    const newPublication = await this.userservice.createPost(createPublication.dataValues, req.body.user);
    return res.status(201).json({ message: 'New post uploaded', post: newPublication });

  }
  @Get('myPosts')
  async getMyPost(@Request() req, @Response() res) {
    const myPost = await this.userservice.getMyPost(req.body.user.id);
    return res.status(200).json({ myPost: myPost });

  }
  @Get('servicesOnPost/:id')
  async servicesOnPost(@Param('id') id: string, @Response() res) {
    const service = await this.userservice.servicesOnPost(parseInt(id));
    return res.status(200).json({ service: service });

  }

  @Get('getFreeLanceInfo/:id')
  async freeLanceInfo(@Param('id') id: string, @Response() res) {

    const freeLanceInfo = await this.userservice.showFreeLanceinfo(parseInt(id));
    return res.status(200).json({ freeLanceInfo: freeLanceInfo });
  }


  @Post('rateFreeLance/:id')
  async rateFreeLance(@Param('id') id: string, @Body('rate') rate: number, @Request() req, @Response() res) {
    const userId = req.body.user.id;
    const rateFreeLance = await this.userservice.rateFreeLance(parseInt(id), userId, rate);
    return res.status(200).json({ rate: rateFreeLance });
  }

  @Post('acceptRequest/:id')
  async acceptRequest(@Param('id') id: string, @Response() res, @Request() req) {
    const service = await this.userservice.acceptRequest(parseInt(id), req.body.user.id);
    return res.status(200).json({ service: service });
  }

  @Post('searchaboutFreeLance')
  async serchAboutFreeLance(@Response() res, @Body('Fname') Fname: string, @Body('Lname') Lname: string) {
    const freeLace = await this.userservice.searchAboutFreeLance(Fname, Lname);

    return res.status(200).json({ date: freeLace });

  }

  @Get('allCategory')
  async getAllCategory(@Response() res) {
    const data = await this.userservice.showAllCategory();
    return res.status(200).json({ data: data });
  }
  @Post('searchAboutCategory')
  async searchAboutCategory(@Body('name') name: string, @Response() res) {
    const data = await this.userservice.searchAboutCategory(name);
    return res.status(200).json({ data: data });
  }


  @Post('adddRequestOnPostPoint/:id')
  async adddRequestOnPostPoint(@Param('id') id: string, @Request() req, @Response() res) {
    const newRequest = await this.userservice.adddRequestOnPostPoint(parseInt(id), req.body.user.id);
    return res.status(201).json({ data: newRequest });
  }

  @Delete('deleteRequest/:id')
  async deletePost(@Param('id') id: string, @Response() res) {
    const del = await this.userservice.deletRequest(parseInt(id));

    return res.status(200).json({ data: "done" });
  }
  @Get('showMyRequests')
  async showMyRequests(@Request() req, @Response() res) {
    const showMine = await this.userservice.showMyRequests(req.body.user.id);
    return res.status(200).json({ data: showMine });
  }
  @Get('showPostpoint')
  async showPostpoint(@Response() res) {
    const posts = await this.userservice.showPostpoint();
    return res.status(200).json({ data: posts })
  }
  @Get('showPostpointByCategory/:category')
  async showPostpointByCategory(@Response() res, @Param('category') category: string) {
    const posts = await this.userservice.showPostPointByCategory(category);
    return res.status(200).json({ data: posts })
  }


  @Post('addComplaint/:serviceId')
  async addComplaint(@Request() req,@Response() res,@Param('serviceId') serviceId,@Body('content') content :string){
   const addComplaint=await this.userservice.addComplaint(parseInt(serviceId),req.body.user.id,content);
  return res.status(201).json({data:addComplaint});
  }
}
