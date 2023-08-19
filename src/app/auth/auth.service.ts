import {  BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRole } from '../../database/models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { validate } from 'class-validator';
import { FreeLance } from 'src/database/models/freeLance.model';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(FreeLance)
    private FreeLacneModele: typeof FreeLance,
    private readonly jwtService: JwtService,
  ) {}



async register(user: User,freeLance:FreeLance): Promise<{ user: User; token: string }> {
  
  const validationErrors = await validate(new User(user));
  const isExist= await this.findByEmail(user.email);
      if(isExist){
        throw new BadRequestException('email already used');
  }

      if (validationErrors.length > 0) {
        const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
        throw new BadRequestException(errorMessages);
      }
  
 const saltRounds = 10;
  user.password = await hash(user.password,saltRounds);
let newUsers=null;
  try{
  const newUser = await this.userModel.sequelize.transaction(async t => {
    const transactionHost = { transaction: t };

   newUsers= await this.userModel.create(
      user,
      transactionHost,
    );





    if(user.role==UserRole.FreeLnce){
      console.log(newUsers.id);
      freeLance.userId=newUsers.id;
      console.log( freeLance.userId);

    if(freeLance){  
      
    const validationErrors = await validate(new FreeLance(freeLance));
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
      throw new BadRequestException(errorMessages);
    }  
    await this.FreeLacneModele.create(freeLance
      ,transactionHost);
    }
  }});
}catch(e){
  throw new BadRequestException(e);
}

const token = await this.login(user);

return { user: newUsers, token };

}


async validatePassword(email: string, password: string): Promise<User | null> {
  const user = await this.findByEmail( email);

  if (user &&await compare(password ,user.password)) {
    return user;
  }

  return null;
}

async findByEmail(email: string): Promise<User | null> {
  const user = await this.userModel.findOne({
      where:{email:email},
    });
  if(user){
    return user.dataValues;

  }
  else
  return null;

}
async login(user: User): Promise<string> {
  const payload = { email: user.email };

  return this.jwtService.sign(payload);
}

 decodeToken(token :string) {
    try {
        const decodedToken = this.jwtService.decode(token);
      return decodedToken;
    } catch (err) {
      return err;
    }
  }

  async findById(id: number): Promise<User> {
    return await this.userModel.findOne({where:{id:id}});
  }
}
