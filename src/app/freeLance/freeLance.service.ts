import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { validate } from "class-validator";
import { FreelanceCategory, Posts } from "src/database/models/post.model";
import { FreeLance } from "src/database/models/freeLance.model";
import { Service } from "src/database/models/service.model";
import { User, UserRole } from "src/database/models/user.model";
import { Op, where } from 'sequelize';
import { Payment } from "src/database/models/payment.model";
import * as path from 'path';
import * as fs from 'fs';
import { Stagging } from "src/database/models/stagging.model";
import { WalletService } from "../wallet/wallet.service";
import { Category } from "src/database/models/category.model";
import { Ineterest } from "src/database/models/interest.model";
import { postWithPoint } from "src/database/models/postWithPoint.model";
import { UserRequest } from "src/database/models/userRequest.model";
import { StaggingToPoint } from "src/database/models/staggingToPoint.model";
import { PayAndRecive } from "src/database/models/payAndRecive.model";




@Injectable()
export class FreeLanceService {
  constructor(
    @InjectModel(User)
    private readonly UserModel: typeof User,
    @InjectModel(FreeLance)
    private readonly FreeLanceModel: typeof FreeLance,
    @InjectModel(Service)
    private readonly ServiceModel: typeof Service,
    @InjectModel(Posts)
    private publishModel: typeof Posts,
    @InjectModel(Payment)
    private readonly PaymentModel: typeof Payment,
    @InjectModel(Stagging)
    private readonly staggingModele: typeof Stagging,
    @InjectModel(StaggingToPoint)
    private readonly staggingToPointModele: typeof StaggingToPoint,
    @InjectModel(Category)
    private readonly categoryModele: typeof Category,
    @InjectModel(Ineterest)
    private readonly ineterestModele: typeof Ineterest,
    @InjectModel(UserRequest)
    private readonly userRequestModel: typeof UserRequest,
    @InjectModel(postWithPoint)
    private readonly postPointModel: typeof postWithPoint,
    @InjectModel(PayAndRecive)
    private readonly payAndReciveModel: typeof PayAndRecive,
    private readonly jwtService: JwtService,
    private readonly walletService: WalletService
  ) { }

  async getAllPost(): Promise<Posts[]> {
    const published = await this.publishModel.findAll({
      include: [{
        model: User,
        attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
      },]
    });
    if (!published) {
      throw new NotFoundException('post not fouund');
    }

    return published;

  }


  async getAllPostByCategory(category: string): Promise<Posts[]> {
    const regexCatCategory = new RegExp(category, 'i');
    const published = await this.publishModel.findAll({
      where: { category: { [Op.like]: '%' + regexCatCategory.source + '%' } }
      , include: [{
        model: User,
        attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
      },]
    });
    if (!published) {
      throw new NotFoundException('post not fouund');
    }

    return published;

  }


  async addService(service: Service, UserId: number, postId: number): Promise<Service> {

    const published = await this.publishModel.findByPk(postId);
    if (!published) {
      throw new NotFoundException('there no data');
    }
    const user = await this.UserModel.findOne({ where: { id: UserId }, include: [FreeLance] });
    const freeLanceId = user.freeLances.id;

    service.freelaneId = freeLanceId;
    service.publishedId = postId;
    const validationErrors = await validate(service);
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
      throw new BadRequestException(errorMessages);
    }
    const createService = await this.ServiceModel.create(service);
    return createService;
  }


  async checkMyService(id: number): Promise<Service[]> {
    const freeLance = await this.FreeLanceModel.findOne({ where: { userId: id } });

    const myService = await this.ServiceModel.findAll({
      where: { freelaneId: freeLance.id },
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
    if (!myService) {
      throw new NotFoundException('no service found');
    }
    return myService;

  }

  async showAcceptedServices(id: number) {

    const user = await this.UserModel.findOne({ where: { id: id }, include: [FreeLance] });
    const freeLanceId = user.freeLances.id;

    const service = await this.ServiceModel.findAll(
      {
        where: { freelaneId: freeLanceId, isAccepted: true },
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
    return service;
  }

  async showstatisticalsinyear(year: number,userId:number) 
  {
    const freeLace=await this.FreeLanceModel.findOne({where:{userId:userId}});

    if(!freeLace){
      throw new NotFoundException('there no data');
    }
    const statisticals=await this.payAndReciveModel.statisticalsyear(year,freeLace.id);
    if(!statisticals){
      throw new NotFoundException('there no data')
    }
    return statisticals;
  }


  
  async searchAboutFreeLance(Fname: string, Lname: string): Promise<FreeLance[]> {
    const regexFname = new RegExp(`${Fname}`, 'i');
    const regexLname = new RegExp(`${Lname}`, 'i');
    let user;

    if (Fname && Lname) {
      user = await this.UserModel.findAll({
        where: {
          Fname: { [Op.like]: '%' + regexFname.source + '%' },
          Lname: { [Op.like]: '%' + regexLname.source + '%' },
          role: UserRole.FreeLnce,
        },
      });
    } else if (Fname) {
      user = await this.UserModel.findAll({
        where: {
          Fname: { [Op.like]: '%' + regexFname.source + '%' },
          role: UserRole.FreeLnce,
        },
      });
    } else if (Lname) {
      user = await this.UserModel.findAll({
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
      const result = await this.FreeLanceModel.findOne({
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

  async uploadOrUpdatePhoto(photo, userId: number) {
    if (!photo) {
      throw new BadRequestException('photo is required');
    }

    const freeLance = await this.FreeLanceModel.findOne({
      where: { userId: userId }, include: [{
        model: User,
        attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
      },]
    });
    if (!freeLance) {
      throw new BadRequestException('there are no data');
    }
    const binaryData = Buffer.from(photo, 'base64');
    const filename = `file_${Date.now()}.${photo}`;
    const publicFolderPath = path.join(__dirname, '..', 'public');

    const filePath = path.join(publicFolderPath, filename);

    await fs.promises.mkdir(publicFolderPath, { recursive: true });

    await fs.promises.writeFile(filePath, binaryData);

    freeLance.photoName = filePath.replace(publicFolderPath, '').replace(/\\/g, '/');
    await freeLance.save();
    return freeLance;
  }



 
  async attachFile(file: string, fileType: string, serviceId: number) {
    const service = await this.ServiceModel.findByPk(serviceId);
    const post=await this.publishModel.findByPk(service.publishedId);
    if (!service||!post) {
      throw new NotFoundException('service not found');
    }
    const binaryData = Buffer.from(file, 'base64');
    const filename = `file_${Date.now()}.${fileType}`;
    const publicFolderPath = path.join(__dirname, '..', 'public');

    const filePath = path.join(publicFolderPath, filename);

    await fs.promises.mkdir(publicFolderPath, { recursive: true });

    await fs.promises.writeFile(filePath, binaryData);

    const stagging = await this.staggingModele.findOne({ where: { serviceId: serviceId } });
    if (!stagging || stagging.isAttached == true) {
      throw new NotFoundException('service not found');
    }
    const freelance = await this.FreeLanceModel.findByPk(service.freelaneId);

    stagging.isAttached = true;

    service.filePath = filePath.replace(publicFolderPath, '').replace(/\\/g, '/');
const recive=await this.payAndReciveModel.create({
  userId:stagging.userId,
  freeLanceId:service.freelaneId,
  date:new Date(),
  category:post.category,
  amount:service.price,
});

    await service.save();
    await this.walletService.deposit(freelance.userId, service.price);
    await stagging.save();
    return true;
  }
  async showAllCategory() {
    const category = await this.categoryModele.findAll();
    if (!category) {
      throw new BadRequestException('there no data');
    }
    return category;
  }

  async addIneterest(categoryId: number, userId: number) {
    const freeLace = await this.FreeLanceModel.findOne({ where: { userId: userId } });
    if (!freeLace) {
      throw new BadRequestException('there no data')
    }
    const category = await this.categoryModele.findByPk(categoryId);
    if (!category) {
      throw new BadRequestException('there no data')
    }
    const interest = await this.ineterestModele.create({ freelaneId: freeLace.id, categor: category.categor })
    return interest;
  }
  async deleteIneterest(interestId: number, userId: number) {
    const interest = await this.ineterestModele.findByPk(interestId);

    if (!interest) {
      throw new BadRequestException('there no data')
    }

    const freeLace = await this.FreeLanceModel.findOne({ where: { userId: userId } });

    if (!freeLace) {
      throw new BadRequestException('there no data')
    }
    if (interest.freelaneId != freeLace.id) {
      throw new UnauthorizedException('access denided');
    }
    await interest.destroy();
    return true;
  }
  async searchAboutCategory(catName: string) {
    const regexCatCategory = new RegExp(catName, 'i');
    const category = await this.categoryModele.findAll({ where: { categor: { [Op.like]: '%' + regexCatCategory.source + '%' } } });
    if (!category) {
      throw new NotFoundException('there no data');
    }
    return category;
  }
  async showMyInterest(userId: number) {
    const freeLace = await this.FreeLanceModel.findOne({ where: { userId: userId } });

    const interest = await this.ineterestModele.findAll({ where: { freelaneId: freeLace.id } });

    return interest;
  }

  async showPostAboutInterest(userId: number) {
    const myInterest = await this.showMyInterest(userId);
    if (!myInterest) {
      throw new NotFoundException('there no data');
    }
    const interests = myInterest.map(interest => interest.categor);
    const items = await this.publishModel.findAll({
      where: {
        category: interests,
      },
    });
    return items;
  }
  async addPost(post: postWithPoint, userId: number) {

    const freeLace = await this.FreeLanceModel.findOne({ where: { userId: userId } });
    post.freelaneId = freeLace.id;

    const validationErrors = await validate(new postWithPoint(post));

    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
      throw new BadRequestException(errorMessages);
    }
    const newPost = await this.postPointModel.create(post);
    return newPost;
  }
  async deletePost(id: number) {
    const del = await this.postPointModel.findByPk(id);
    if (!del) {
      throw new NotFoundException('there no data');
    }
    await del.destroy();
    return true;
  }
  async showUserRequest(id: number) {
    const userRequest = await this.userRequestModel.findAll({ where: { postId: id, isRejected: false } });
    if (!userRequest.length) {
      throw new NotFoundException('there no data');
    }
    return userRequest;
  }
  async acceptUserRequest(id: number) {
    const userRequest = await this.userRequestModel.findByPk(id);
    if (!userRequest) {
      throw new NotFoundException('there no data');
    }

    const user = await this.UserModel.findByPk(userRequest.userId);
    const post = await this.postPointModel.findByPk(userRequest.postId);
    if (!user || !post) {
      throw new NotFoundException('there no data');
    }
    if (user.point < post.price) {
      throw new BadRequestException('the user havent enough point');
    }
    userRequest.isAcceppted = true;
    user.point = user.point - post.price;
    await user.save;
    await userRequest.save();
    const stagging = await this.staggingToPointModele.create({
      userRequestId: id,
      postId: post.id
    });
    return true;
  }

  async rejectUserRequest(id: number) {
    const userRequest = await this.userRequestModel.findByPk(id);
    if (userRequest.isAcceppted == true) {
      throw new BadRequestException('this user request is accepted');
    }
    if (!userRequest) {
      throw new NotFoundException('there no data');
    }

    userRequest.isRejected = true;
    await userRequest.save();

    return true;
  }
  async attachFileToPostPoint(file: string, fileType: string, userRequestId: number) {
    const userRequest = await this.userRequestModel.findByPk(userRequestId);

    if (!userRequest) {
      throw new NotFoundException('userRequest not found');
    }

    const binaryData = Buffer.from(file, 'base64');
    const filename = `file_${Date.now()}.${fileType}`;
    const publicFolderPath = path.join(__dirname, '..', 'public');

    const filePath = path.join(publicFolderPath, filename);

    await fs.promises.mkdir(publicFolderPath, { recursive: true });

    await fs.promises.writeFile(filePath, binaryData);

    const stagging = await this.staggingToPointModele.findOne({ where: { userRequestId: userRequestId } });
    if (!stagging || stagging.isAttached == true) {
      throw new NotFoundException('stagging not found');
    }
    const post = await this.postPointModel.findByPk(userRequest.postId);
    if (!post) {
      throw new NotFoundException('there no data');
    }
    const freelance = await this.FreeLanceModel.findByPk(post.freelaneId);

    stagging.isAttached = true;

    userRequest.filePath = filePath.replace(publicFolderPath, '').replace(/\\/g, '/');
    const recive=await this.payAndReciveModel.create({
      userId:userRequest.userId,
      freeLanceId:post.freelaneId,
      date:new Date(),
      category:post.category,
      amount:post.price,
      isByPoint:true
    });
    await userRequest.save();
    await this.walletService.depositByPoint(freelance.userId, post.price);
    await stagging.save();
    return true;
  }


}