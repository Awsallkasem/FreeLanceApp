import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { FreeLance } from "src/database/models/freeLance.model";
import { User } from "src/database/models/user.model";

@Injectable()
export class FreeLanceService{
    constructor(    @InjectModel(User)
    private readonly UserModel :typeof User,
    @InjectModel(FreeLance)
    private readonly FreeLanceModel :typeof FreeLance,
    private readonly jwtService: JwtService,

    ){}
    async addService(freeLAnce:FreeLance){


    }
}