import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../database/models/user.model';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly userRepository: Repository<User>,
    
  ) {}

  async createUser(user: User): Promise<User> {
    
    return  await this.userModel.create(user);
  }

  async findById(id: number): Promise<User> {
    return await this.userModel.findByPk(id);
  }


  
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
        where:{email:email},
      });
    if(user){
      return user.dataValues;
  
    }
    else
    return null;
  
  }
  


  async update(id: number, user: User): Promise<[number, User[]]> {
    return this.userModel.update(user, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    return this.userModel.destroy({ where: { id } });
  }
}
