import { BadRequestException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRole } from '../../database/models/user.model';
import { Repository } from 'typeorm';
import { Posts } from 'src/database/models/post.model';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Service } from 'src/database/models/service.model';
import { FreeLance } from 'src/database/models/freeLance.model';
import { Rating } from 'src/database/models/rating.model';
import { WalletService } from '../wallet/wallet.service';
import { Stagging } from 'src/database/models/stagging.model';
import { Category } from 'src/database/models/category.model';
import ta from 'date-fns/locale/ta';
import { Op } from 'sequelize';
import { UserRequest } from 'src/database/models/userRequest.model';
import { postWithPoint } from 'src/database/models/postWithPoint.model';
import { Complaint } from 'src/database/models/complaint.model';
import { addDays, format } from 'date-fns';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(FreeLance)
    private freeLanceModel: typeof FreeLance,
    @InjectModel(Stagging)
    private readonly staggingModele: typeof Stagging,
    @InjectModel(Rating)
    private readonly ratingModele: typeof Rating,
    @InjectModel(Posts)
    private postModel: typeof Posts,
    @InjectModel(Service)
    private readonly serviceModele: typeof Service,
    @InjectModel(Category)
    private readonly categoryModele: typeof Category,
    @InjectModel(UserRequest)
    private readonly userRequestModele: typeof UserRequest,
    @InjectModel(postWithPoint)
    private readonly postWithPointModele: typeof postWithPoint,
    private readonly walletService: WalletService,
    @InjectModel(Complaint)
    private readonly complaintModele:typeof Complaint,
    private readonly jwtService: JwtService,

  ) { }

  async createPost(published: Posts, user: User): Promise<Posts> {
    published.userId = user.id;

    const validationErrors = await validate(new Posts(published));
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
      throw new BadRequestException(errorMessages);
    }
    return await this.postModel.create(published);
  }
  async getMyPost(id: string) {
    return await this.postModel.findAll({
      where: { userId: id }, include: [
        {
          model: User,
          attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
        }
      ]
    });

  }

  async servicesOnPost(id: number): Promise<Service[]> {
    const published = await this.postModel.findByPk(id);
    if (!published) {
      throw new NotFoundException('post not fouund');
    }
    const service = await this.serviceModele.findAll({
      where: {
        publishedId: id
      },
      include: [
        {
          model: Posts,
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

  async acceptRequest(serviceId: number, userId: number) {
    const service = await this.serviceModele.findByPk(serviceId);
    if (!service) {
      throw new NotFoundException('service not found');
    }

    service.Sdate = new Date();
    const sdate=new Date(service.Sdate+ 'T00:00:00');
    const endDate = new Date(sdate.getTime() + service.numDays * 24 * 60 * 60 * 1000);
service.Edate=endDate
    service.isAccepted = true;
    const stagging = await this.staggingModele.create({ serviceId: serviceId, userId: userId });
    await this.walletService.disposit(userId, service.price);
    await service.save();
    return service;
  }

  async searchAboutFreeLance(Fname: string, Lname: string): Promise<FreeLance[]> {
    const regexFname = new RegExp(`${Fname}`, 'i');
    const regexLname = new RegExp(`${Lname}`, 'i');
    let user;

    if (Fname && Lname) {
      user = await this.userModel.findAll({
        where: {
          Fname: { [Op.like]: '%' + regexFname.source + '%' },
          Lname: { [Op.like]: '%' + regexLname.source + '%' },
          role: UserRole.FreeLnce,
        },
      });
    } else if (Fname) {
      user = await this.userModel.findAll({
        where: {
          Fname: { [Op.like]: '%' + regexFname.source + '%' },
          role: UserRole.FreeLnce,
        },
      });
    } else if (Lname) {
      user = await this.userModel.findAll({
        where: {
          Lname: { [Op.like]: '%' + regexLname.source + '%' },
          role: UserRole.FreeLnce,
        },
      });
    } else {
      throw new BadRequestException('There are required fields');
    }

    if (!user || user.length === 0) {
      throw new NotFoundException('No data found');
    }

    const searchPromises: Promise<FreeLance | null>[] = user.map(async (element) => {
      const result = await this.freeLanceModel.findOne({
        where: { userId: element.id },
        include: {
          model: User,
          attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
        },
      });
      return result;
    });

    const searchResults = await Promise.all(searchPromises);

    const filteredResults: FreeLance[] = searchResults.filter((result) => result !== null);

    if (filteredResults.length === 0) {
      throw new NotFoundException('No data found');
    }

    return filteredResults;
  }

  async showAllCategory() {
    const category = await this.categoryModele.findAll();
    if (!category) {
      throw new BadRequestException('there no data');
    }
    return category;
  }
  async searchAboutCategory(catName: string) {
    const regexCatName = new RegExp(`${catName}`, 'i');

    const category = await this.categoryModele.findAll({ where: { categor: { [Op.like]: '%' + regexCatName.source + '%' } } });
    if (!category) {
      throw new NotFoundException('there no data');
    }
    return category;
  }

  async adddRequestOnPostPoint(postId: number, userId: number) {
    const isExist = await this.userRequestModele.findOne({ where: { userId: userId, isRejected: false, postId: postId } });
    if (isExist) {
      throw new BadRequestException('there ara a pervious request');
    }
    const user = await this.userModel.findByPk(userId);
    const post = await this.postWithPointModele.findByPk(postId);
    if (!user || !post) {
      throw new NotFoundException('there no data');
    }
    if (user.point < post.price) {
      throw new BadRequestException('you should have more point');
    }
    const addRequest = await this.userRequestModele.create({
      postId: postId,
      userId: userId
    });


    return addRequest;

  }

  async deletRequest(id: number) {
    const del = await this.userRequestModele.findByPk(id);
    if (!del) {
      throw new NotFoundException('there no data');
    }
    await del.destroy();
    return true;
  }
  async showMyRequests(userId: number) {
    const myRequest = await this.userRequestModele.findAll({
      where: { userId: userId }, include: [
        {
          model: postWithPoint,
          attributes: { include: ['numDays', 'price', 'content'] },
        }
      ]
    });
    if (!myRequest) {
      throw new NotFoundException('there no data');
    }
    return myRequest;
  }
  async showAcceptedRequests(userId: number) {
    const myRequest = await this.userRequestModele.findAll({
      where: { userId: userId, isAcceppted: true }, include: [
        {
          model: postWithPoint,
          attributes: { include: ['numDays', 'price', 'content'] },
        }
      ]
    });
    if (!myRequest) {
      throw new NotFoundException('there no data');
    }
    return myRequest;

  }
  async showRejectRequest(userId: number) {
    const myRequest = await this.userRequestModele.findAll({
      where: { userId: userId, isRejected: true }, include: [
        {
          model: postWithPoint,
          attributes: { include: ['numDays', 'price', 'content'] },
        }
      ]
    });
    if (!myRequest) {
      throw new NotFoundException('there no data');
    }
    return myRequest;
  }


  async showPostpoint() {
    const published = await this.postWithPointModele.findAll({
      include: [{
        model: FreeLance,
        include: [{
          model: User,
          attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
        }]
      },]
    });
    if (!published) {
      throw new NotFoundException('there no data');
    }

    return published;

  }


  async showPostPointByCategory(category: string): Promise<postWithPoint[]> {
    const regexCatCategory = new RegExp(category, 'i');
    const published = await this.postWithPointModele.findAll({
      where: { category: { [Op.like]: '%' + regexCatCategory.source + '%' } }
      , include: [{
        model: FreeLance,
        include: [{
          model: User,
          attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
        }]
      },]
    });

    if (!published) {
      throw new NotFoundException('post not fouund');
    }

    return published;

  }

  async addComplaint(serviceId:number,userId:number,content:string){
    const service=await this.serviceModele.findByPk(serviceId);
    if(!service){
      throw new NotFoundException('there no data');
    }
    const newComplaint=await this.complaintModele.create({
userId:userId,
serviceId:serviceId,
    });
    if(content){
      newComplaint.content=content;
    }
    return await newComplaint.save();
  }
}
