import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/database/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }



  async showAllRequest(): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { isActive: false, isReject: false, role: UserRole.FreeLnce }
    });
    if (user) {
      return user.dataValues;

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
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    return user;
  }

}

