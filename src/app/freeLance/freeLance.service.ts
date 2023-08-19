import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { validate } from "class-validator";
import { FreelanceCategory, Published } from "src/database/models/Publish.model";
import { FreeLance } from "src/database/models/freeLance.model";
import { Service } from "src/database/models/service.model";
import { User } from "src/database/models/user.model";
import { Op } from 'sequelize';
import { Payment } from "src/database/models/payment.model";



@Injectable()
export class FreeLanceService {
  constructor(
    @InjectModel(User)
    private readonly UserModel: typeof User,
    @InjectModel(FreeLance)
    private readonly FreeLanceModel: typeof FreeLance,
    @InjectModel(Service)
    private readonly ServiceModel: typeof Service,
    @InjectModel(Published)
    private publishModel: typeof Published,
    @InjectModel(Payment)
    private readonly PaymentModel :typeof Payment,
    private readonly jwtService: JwtService,

  ) { }

  async getAllPost(): Promise<Published[]> {
    const published = await this.publishModel.findAll({ include: [  {
      model: User,
      attributes: { exclude: ['password','updatedAt','createdAt','isBlocked','isReject','isActive'] },
    },] });
    if (!published) {
      throw new NotFoundException('post not fouund');
    }

    return published;

  }


  async getAllPostByCategory(category: string): Promise<Published[]> {

    const published = await this.publishModel.findAll({ where: { category: this.searchCategory(category) }, include: [  {
      model: User,
      attributes: { exclude: ['password','updatedAt','createdAt','isBlocked','isReject','isActive'] },
    },] });
    if (!published) {
      throw new NotFoundException('post not fouund');
    }

    return published;

  }


  async addService(service: Service, UserId: number, postId: number): Promise<Service> {

    const published = await this.publishModel.findByPk(postId);
    if (!published) {
      throw new NotFoundException;
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
    if (!myService) {
      throw new NotFoundException('no service found');
    }
    return myService;

  }

async showAcceptedServices(id :number){

  const user = await this.UserModel.findOne({ where: { id: id }, include: [FreeLance] });
  const freeLanceId = user.freeLances.id;

  const service =await this.ServiceModel.findAll(
    {where:{freelaneId:freeLanceId,isAccepted:true},
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
  return service;
}

  searchCategory(searchTerm: string): FreelanceCategory {
    const searchTermRegex = new RegExp(searchTerm, 'i');
    const categoryKeys = Object.keys(FreelanceCategory) as (keyof typeof FreelanceCategory)[];
    const foundKey = categoryKeys.find(key =>
      searchTermRegex.test(FreelanceCategory[key])
    );
    if (!foundKey) {
      throw new NotFoundException('category not found');
    }
    return FreelanceCategory[foundKey];
  }


  async showMonthMony(month :number){
    const payamentsInMonth=await this.PaymentModel.findAll({where:{
      date:{
        [Op.and]: [
          { [Op.gte]: new Date(new Date().getFullYear(), month - 1, 1) }, 
          { [Op.lte]: new Date(new Date().getFullYear(), month, 0) } 
        ]
      }
    }});
if(!payamentsInMonth){
  throw new NotFoundException('there no thing');
}

return payamentsInMonth;

  }


  
  async showYearMoney(year:number){
    const payamentsInYear=await this.PaymentModel.findAll({where:{
      date:{
        [Op.and]: [
          { [Op.gte]: new Date(year,0, 1) }, 
          { [Op.lte]: new Date(year, 11, 31) } 
        ]
      }
    }});
if(!payamentsInYear){
  throw new NotFoundException('there no thing');
}

return payamentsInYear;

  }
}