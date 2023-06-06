import { BadRequestException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/models/user.model';
import { Repository } from 'typeorm';
import { Published } from 'src/database/models/Publish.model';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Service } from 'src/database/models/service.model';
import { where } from 'sequelize';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Published)
    private publishModel: typeof Published,
    @InjectModel(Service)
    private readonly serviceModele: typeof Service,
    private readonly jwtService: JwtService,

  ) { }

  async createPost(published: Published, user: User): Promise<Published> {
    published.userId = user.id;

    const validationErrors = await validate(new Published(published));
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
      throw new BadRequestException(errorMessages);
    }
    return await this.publishModel.create(published);
  }
  async getMyPost(id: string) {
    return await this.publishModel.findAll({ where: { userId: id }, include: [User] });

  }

  async servicesOnPost(id: number): Promise<Service[]> {
    const published=await this.publishModel.findByPk(id);
    if(!published){
      throw new NotFoundException('post not fouund'); 
    }
    const service = await this.serviceModele.findAll({
      where: {
        publishedId: id
      },
       include: [
        {
          model: Published,
          include: [
            {
              model: User,
              attributes: { exclude: ['password','updatedAt','createdAt','isBlocked','isReject','isActive'] },
            },
          ],
        },
      ],
    });

    if (!service) {
      throw new NotFoundException('service not found');
    }
    return service;
  }





















  // async createUser(user: User): Promise<User> {

  //   return await this.userModel.create(user);
  // }

  // async findById(id: number): Promise<User> {
  //   return await this.userModel.findByPk(id);
  // }



  // async findByEmail(email: string): Promise<User | null> {
  //   const user = await this.userRepository.findOne({
  //     where: { email: email },
  //   });
  //   if (user) {
  //     return user.dataValues;

  //   }
  //   else
  //     return null;

  // }



  // async update(id: number, user: User): Promise<[number, User[]]> {
  //   return this.userModel.update(user, {
  //     where: { id },
  //     returning: true,
  //   });
  // }

  // async delete(id: number): Promise<number> {
  //   return this.userModel.destroy({ where: { id } });
  // }
}
