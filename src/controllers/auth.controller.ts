import { Controller, Post, Body,Response,Request, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../database/models/user.model';
import { FreeLance } from 'src/database/models/freeLance.model';
import { Console } from 'console';

  @Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  async register(@Body('user') user: User,@Body('freeLance') freeLance:FreeLance,@Response() res) {
try{
    const createUser = new User(user);
const createFreeLance=new FreeLance(freeLance);
    const newUser = await this.authService.register(createUser.dataValues,createFreeLance.dataValues);
    res.setHeader('Authorization',  newUser.token);
    return res.status(201).json({ message: 'User registered successfully', user: newUser.user} );
  }catch(err){
    throw new BadRequestException(err.message);
  }


}
  @Post('login')
  async login(@Body() user:User,@Response() res) {
    if(!user.password||!user.email){
throw new BadRequestException('all filed is required')
    }
    const authenticatedUser = await this.authService.validatePassword(
      user.email,
      user.password,
  
    );

    if (!authenticatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.login(authenticatedUser);
    res.setHeader('Authorization',  token);

    return res.status(200).json({message:'user registered'});
  }

}



