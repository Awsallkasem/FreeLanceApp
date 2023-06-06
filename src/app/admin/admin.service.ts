import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/database/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User)
    private readonly Usermodele:typeof User,
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
      return null;
  }
  async acceptRequest(id: number) {
    const user = await this.findUserByIs(id);

    user.isActive = true;
    return await user.save();
  }

  async rejectRequest(id: number) {
    const user = await this.findUserByIs(id);
    user.isReject = true;

    return await user.save();
  }

  async blockUser(id: number) {
    const user = await this.findUserByIs(id);
    if (user.role == UserRole.ADMIN) {
      throw new UnauthorizedException('access denied');
    }
    user.isBlocked = true;
    return await user.save();
  }

  async findUserByIs(id) {
    const user = await this.Usermodele.findOne({
      where: { id: id },
    });
    return user;
  }

}

