import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { InjectRepository } from '@nestjs/typeorm';
import { Complaint } from 'src/database/models/complaint.model';
import { FreeLance } from 'src/database/models/freeLance.model';
import { PayAndRecive } from 'src/database/models/payAndRecive.model';
import { Service } from 'src/database/models/service.model';
import { User, UserRole } from 'src/database/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User)
    private readonly Usermodele: typeof User,
    @InjectModel(PayAndRecive)
    private readonly payAndReciveModele: typeof PayAndRecive,
    @InjectModel(Complaint)
    private readonly complaintModele: typeof Complaint,
    private readonly jwtService: JwtService,
  ) { }



  async showAllRequest(): Promise<any | null> {
    const user = await this.Usermodele.findAll({
      where: { isActive: false, isReject: false, role: UserRole.FreeLnce }
    });
    if (user) {
      return user;
    }
    else
    throw new NotFoundException('there no data');
  }
  async acceptRequest(id: number) {
    const user = await this.findUserById(id);
    user.isActive = true;
    return await user.save();
  }

  async rejectRequest(id: number) {
    const user = await this.findUserById(id);
    user.isReject = true;

    return await user.save();
  }

  async blockUser(id: number) {
    const user = await this.findUserById(id);
    if (user.role == UserRole.ADMIN) {
      throw new UnauthorizedException('access denied');
    }
    user.isBlocked = true;
    return await user.save();
  }

  async findUserById(id) {
    const user = await this.Usermodele.findOne({
      where: { id: id },
    });
    if(!user){
      throw new NotFoundException('there no data');
    }
    return user;
  }

  async statisticalsCategoryWeekly() {
    const year = new Date();
    const statisticals = await this.payAndReciveModele.statisticalsCategoryweekly(year.getFullYear());
    if(!statisticals){
      throw new NotFoundException('there no data')
    }
    return statisticals;
  }


  async statisticalsCategory() {
    const year = new Date();
    const statisticals = await this.payAndReciveModele.statisticalsCategory();
    if(!statisticals){
      throw new NotFoundException('there no data')
    }
    return statisticals;
  }

  async statisticalsNumUser() {
    const year = new Date();
    const statisticals = await this.Usermodele.statisticalsNumUser(year.getFullYear());
    if(!statisticals){
      throw new NotFoundException('there no data')
    }
    return statisticals;
  }

  async statisticalsNumFreeLance() {
    const year = new Date();
    const statisticals = await this.Usermodele.statisticalsNumFreeLance(year.getFullYear());
    if(!statisticals){
      throw new NotFoundException('there no data')
    }
    return statisticals;
  }

  async statisticalsComplaint() {
    const statisticals = await this.complaintModele.statisticalComplaints();
    if(!statisticals){
      throw new NotFoundException('there no data')
    }
    return statisticals;
  }


  async showComplaint() {
    const complaints = await this.complaintModele.findAll({
      include: [{
        model: User,
        attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
      },
      {
        model: Service,
        include: [{
          model: FreeLance,
          include: [{
            model: User,
            attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
          }]
        }]
      }]
    });
    if(!complaints){
      throw new NotFoundException('there no data');
    }

    return complaints;
  }
  async returnHisCoin(id: number,complaintId:number) {
    const user = await this.findUserById(id);
    
    const complaints = await this.complaintModele.findOne({where:{id:complaintId,userId:id},
      include: [{
        model: User,
        attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
      },
      {
        model: Service,
        include: [{
          model: FreeLance,
          include: [{
            model: User,
            attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
          }]
        }]
      }]
    });

    user.walletBalance += complaints.service.price;
    return await user.save();
  }
}

