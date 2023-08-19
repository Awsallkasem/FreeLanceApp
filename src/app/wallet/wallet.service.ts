// src/wallet/wallet.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/models/user.model';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) { }

  async getBalance(userId: number) {
    const user = await this.userModel.findOne({ where: { id: userId } });
    return user.walletBalance;
  }

  async deposit(userId: number, amount: number) {
    const user = await this.userModel.findOne({ where: { id: userId } });
    user.walletBalance += amount;
    await user.save();
    return user.walletBalance;
  }
  async depositByPoint(userId: number, amount: number) {
    const user = await this.userModel.findOne({ where: { id: userId } });
    user.point += amount;
    await user.save();
    return user.point;
  }
  async disposit(userId: number, amount: number) {
    const user = await this.userModel.findOne({ where: { id: userId } });
    user.walletBalance -= amount;
    user.point += amount;
    await user.save();
    return user.walletBalance;
  }

  
}
