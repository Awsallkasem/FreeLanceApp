import { Controller, Post, Body, Response, Request, UnauthorizedException, BadRequestException, Param, Get, UseFilters, Delete } from '@nestjs/common';
import { Service } from 'src/database/models/service.model';
import { FreeLanceService } from 'src/app/freeLance/freeLance.service';
import { FreelanceCategory } from 'src/database/models/post.model';
import { HttpExceptionFilter } from 'src/filters/global-exception.filter';
import { postWithPoint } from 'src/database/models/postWithPoint.model';

@UseFilters(HttpExceptionFilter)
@Controller('api/freeLace/')

export class FreeLanceController {
  constructor(private readonly freeLanceService: FreeLanceService) { }

  @Get('getAllPost')
  async getAllPost(@Response() res) {
    const posts = await this.freeLanceService.getAllPost();

    return res.status(200).json({ posts: posts });
  }




  @Get('getAllPostByCategory/:category')
  async getAllPostByCategory(@Param('category') category: string, @Response() res) {

    const posts = await this.freeLanceService.getAllPostByCategory(category);
    return res.status(200).json({ posts: posts });
  }

  @Post('addService/:id')
  async addService(@Param('id') id: string, @Body() service: Service, @Request() req, @Response() res) {

    const createService = new Service(service);
    const newService = await this.freeLanceService.addService(createService.dataValues, req.body.user.id, parseInt(id));
    return res.status(201).json({ message: 'Service createred secussefully', service: newService });
  }

  @Get('checkMyService')
  async checkMyService(@Request() req, @Response() res) {

    const myService = await this.freeLanceService.checkMyService(req.body.user.id);
    return res.status(200).json({ service: myService });
  }
  @Get('showAcceptedServices')
  async showAcceptedServices(@Request() req, @Response() res) {
    const services = await this.freeLanceService.showAcceptedServices(req.body.user.id);
    return res.status(200).json({ services: services });
  }

 



  @Get('paymentinyear/')
  async paymentInMont( @Response() res,@Request() req) {
    const year=new Date();

    const statisticals = await this.freeLanceService.showstatisticalsinyear(year.getFullYear(),req.body.user.id);
    return res.status(200).json({ statisticals: statisticals });
  }

  
  @Post('searchaboutFreeLance')
  async serchAboutFreeLance(@Response() res, @Body('Fname') Fname: string, @Body('Lname') Lname: string) {
    const freeLace = await this.freeLanceService.searchAboutFreeLance(Fname, Lname);

    return res.status(200).json({ date: freeLace });

  }



  @Post('attachfile/:serviceId')
  async attachFile(@Param('serviceId') serviceId: string, @Body('file') file: string, @Body('fileType') fileType: string, @Response() res) {
    const isDone = await this.freeLanceService.attachFile(file, fileType, parseInt(serviceId));
    return res.status(200).json({ message: "is done" })
  }
  @Get('allCategory')
  async getAllCategory(@Response() res) {
    const data = await this.freeLanceService.showAllCategory();
    return res.status(200).json({ data: data });
  }
  @Post('searchAboutCategory')
  async searchAboutCategory(@Body('name') name: string, @Response() res) {
    const data = await this.freeLanceService.searchAboutCategory(name);
    return res.status(200).json({ data: data })
  }

  @Delete('deleteIneterest/:id')
  async deleteIneterest(@Param('id') id: string, @Response() res, @Request() req) {
    const data = await this.freeLanceService.deleteIneterest(parseInt(id), req.body.user.id);
    return res.status(200).json({ data: data });
  }

  @Post('addInterest/:id')
  async addIneterest(@Param('id') id: string, @Response() res, @Request() req) {
    const data = await this.freeLanceService.addIneterest(parseInt(id), req.body.user.id);
    return res.status(200).json({ data: data });
  }
  @Get('showMyInterest')
  async showMyInterest(@Response() res, @Request() req) {
    return res.status(200).json({ date: await this.freeLanceService.showMyInterest(req.body.user.id) })

  }
  @Get('showPostAboutInterest')
  async showPostAboutInterest(@Response() res, @Request() req) {
    const posts = await this.freeLanceService.showPostAboutInterest(req.body.user.id);

    return res.status(200).json({ data: posts });
  }

  @Post('addPost')
  async addPost(@Request() req, @Response() res, @Body('post') post: postWithPoint) {

    const createPost = new postWithPoint(post);

    const newPost = await this.freeLanceService.addPost(createPost.dataValues, req.body.user.id);
    return res.status(201).json({ message: 'post added successfully', data: newPost });

  }
  @Delete('deletePost/:id')
  async deletePost(@Param('id') id: string, @Response() res) {
    const del = await this.freeLanceService.deletePost(parseInt(id));

    return res.status(200).json({ data: "done" });

  }
  @Get('showUserRequest/:id')
  async showUserRequest(@Param('id') id: string, @Response() res) {
    const userRequest = await this.freeLanceService.showUserRequest(parseInt(id));
    return res.status(200).json({ data: userRequest });
  }

  @Post('acceptUserRequest/:id')
  async acceptUserRequest(@Param('id') id: string, @Response() res) {
    const accepted = await this.freeLanceService.acceptUserRequest(parseInt(id));

    return res.status(200).json({ data: accepted });
  }

  @Post('uploadPhotoOrReplace')
  async uploadPhotoOrReplace(@Body('photo') photo: string, @Request() req, @Response() res) {
    const uploaded = await this.freeLanceService.uploadOrUpdatePhoto(photo, req.body.user.id);
    return res.status(201).json({ data: uploaded });
  }

  @Post('rejectUserRequest/:id')
  async rejectRequest(@Param('id') id: string, @Response() res) {
    const accepted = await this.freeLanceService.rejectUserRequest(parseInt(id));
    return res.status(200).json({ data: accepted });
  }

  @Post('attachFileToPostPoint/:userRequestId')
  async attachFileToPostPoint(@Param('userRequestId') userRequestId: string, @Body('file') file: string, @Body('fileType') fileType: string, @Response() res) {
    const isDone = await this.freeLanceService.attachFileToPostPoint(file, fileType, parseInt(userRequestId));
    return res.status(200).json({ message: "is done" });
  }


}