import { BadRequestException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/models/user.model';
import { Repository } from 'typeorm';
import { Published } from 'src/database/models/Publish.model';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Service } from 'src/database/models/service.model';
import { FreeLance } from 'src/database/models/freeLance.model';
import { Rating } from 'src/database/models/rating.model';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(FreeLance)
    private freeLanceModel: typeof FreeLance,
    @InjectModel(Rating)
    private readonly ratingModele: typeof Rating,
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
    const published = await this.publishModel.findByPk(id);
    if (!published) {
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
              attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
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
  async showFreeLanceinfo(id: number): Promise<{ freeLance: FreeLance, rate: any }> {
    const freeLance = await this.freeLanceModel.findOne({
      where: { id: id }, include: [{
        model: User,
        attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
      }]
    });
    if (!freeLance) {
      throw new NotFoundException('free lance not found');
    }
    const rate = await freeLance.calculateRating();
    return { freeLance: freeLance, rate: rate };
  }

  async rateFreeLance(freeLanceId: number, userId: number, rate: number): Promise<number> {
    const rating = new Rating({
      userId: userId,
      freelaneId: freeLanceId,
      rating: rate,
    });

    const validationErrors = await validate(rating);
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
      throw new BadRequestException(errorMessages);
    }

    await rating.save();
    const freeLance = await this.freeLanceModel.findByPk(freeLanceId);
    return await freeLance.calculateRating();
  }

  async acceptRequest(id: number) {
    const service = await this.serviceModele.findByPk(id);
    if (!service) {
      throw new NotFoundException('service not found');
    }
    service.date = new Date();
    service.isAccepted=true;
    await service.save();
    return service;
  }

}
