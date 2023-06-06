import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { validate } from "class-validator";
import { FreeLance } from "src/database/models/freeLance.model";
import { Service } from "src/database/models/service.model";
import { User } from "src/database/models/user.model";

@Injectable()
export class FreeLanceService {
    constructor(
        @InjectModel(User)
        private readonly UserModel: typeof User,
        @InjectModel(FreeLance)
        private readonly FreeLanceModel: typeof FreeLance,
        @InjectModel(Service)
        private readonly ServiceModel: typeof Service,
        private readonly jwtService: JwtService,

    ) { }
    async addService(service: Service, UserId: number, postId: number):Promise<Service> {
        const user = await this.UserModel.findOne({ where: { id: UserId }, include: [FreeLance] });
        const freeLanceId = user.freeLances.id;
        service.freelaneId = freeLanceId;
        service.publishedId = postId;
  const validationErrors = await validate(service);
  if (validationErrors.length > 0) {
    const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
    throw new BadRequestException(errorMessages);
  }
  const createService=await this.ServiceModel.create(service);
  return createService;
    }
}