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

  async transfer(fromUserId: number, toUserId: number, amount: number) {
    const fromUser = await this.userModel.findOne({ where: { id: fromUserId } });
    const toUser = await this.userModel.findOne({ where: { id: toUserId } });

    if (!fromUser || !toUser) {
      throw new NotFoundException('Invalid user ID');
    }

    if (fromUser.walletBalance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    fromUser.walletBalance -= amount;
    toUser.walletBalance += amount;
    try {
      await this.userModel.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };
        fromUser.save(transactionHost);
        toUser.save(transactionHost);
      });
    } catch (e) {
      throw new Error(e);
    }


    return { fromWalletBalance: fromUser.walletBalance, toWalletBalance: toUser.walletBalance };
  }
}
