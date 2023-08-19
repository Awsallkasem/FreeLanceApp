import { Injectable, Type, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';

import { InjectModel } from '@nestjs/sequelize';
import { Payment } from 'src/database/models/payment.model';
import { User } from 'src/database/models/user.model';
import axios, { AxiosRequestConfig } from 'axios';
import { Request } from 'express';
import { Payout } from 'src/database/models/payout.model';
import { FreeLance } from 'src/database/models/freeLance.model';
import { Packgs } from 'src/database/models/packgs.model';


class DataForBayment {
  static userId: number;
  static amount: number;
  static setAmount(amount: number) {
    this.amount = amount;
  }

  static setUserId(userId: number) {
    this.userId = userId;
  }


}

@Injectable()
export class paymentService {
  constructor(
    @InjectModel(Payout)
    private readonly payoutModele: typeof Payout,
    @InjectModel(User)
    private readonly UserModel: typeof User,
    @InjectModel(FreeLance)
    private readonly FreeLanceModel: typeof FreeLance,
    @InjectModel(Packgs)
    private readonly packgsModele:typeof Packgs
  ) { }
  async receiveMoney(packgId: number, userId: number) {
    const amount=(await this.packgsModele.findByPk(packgId)).amout;
    DataForBayment.amount = amount;
    DataForBayment.userId = userId;
    const authHeader = Buffer.from(
      'AQ0lkpBSIK9roOaQe3hx2RBpwp4B4J0Pg9hf8qNma4ldJ6Ed1DbYU7i_YnvW0DaS0XlB0kiRUkYKegbA:EHxX5I1KHvgn88vahZNJstKK-6Nh-z7Kb0865JohnAb-nFciadAR2fOfgKob9ccv1qJYZJqE8i3F7LA0'
    ).toString('base64');


    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/json',
      },
    };

    const paymentRequestBody = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            total: amount.toString(),
            currency: 'USD',
          },
          description: 'Payment for your order',
        },
      ],
      redirect_urls: {
        return_url: 'http://localhost:3000/api/payments/success', // Replace with your success URL
        cancel_url: 'http://localhost:3000/api/payments/cancel', // Replace with your cancel URL
      },
    };

    try {
      const response = await axios.post(
        'https://api.sandbox.paypal.com/v1/payments/payment',
        paymentRequestBody,
        config,
      );

      const approvalLink = response.data.links.find((link) => link.rel === 'approval_url');

      if (approvalLink) {
        return approvalLink.href;
      } else {
        throw new Error('Failed to obtain PayPal approval link.');
      }
    } catch (error) {
      console.error('PayPal payment initiation error:', error.response?.data || error.message);
      throw new Error('Failed to initiate PayPal payment.');
    }
  }
  async sendMoney(amount: number, point: number, userId: number) {
    const user = await this.UserModel.findOne({ where: { id: userId } });
    const freeLance = await this.FreeLanceModel.findOne({ where: { userId: user.id } });

    if (amount > user.walletBalance) {
      throw new BadRequestException(`your wallet balance is ${user.walletBalance} less than ${amount}`);
    }
    if(point>user.walletBalance){
      throw new BadRequestException(`your poit balance is ${user.point} less than ${point}`);

    }
    if (amount < 5&&point<5) {

      throw new BadRequestException('amount should be 5 or greater than');

    }
    
    if (!freeLance) {

      throw new NotFoundException("freeLance not fouund");
    }
    let acttuallMoney = 0;
    if (amount >= 5) {
      acttuallMoney += amount - Math.ceil(amount * 0.05);
    }
    if (point >= 5) {
      acttuallMoney += point - Math.ceil(point * 0.9);
    }
    const authHeader = Buffer.from(
      'AQ0lkpBSIK9roOaQe3hx2RBpwp4B4J0Pg9hf8qNma4ldJ6Ed1DbYU7i_YnvW0DaS0XlB0kiRUkYKegbA:EHxX5I1KHvgn88vahZNJstKK-6Nh-z7Kb0865JohnAb-nFciadAR2fOfgKob9ccv1qJYZJqE8i3F7LA0'
    ).toString('base64');

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/json',
      },
    };

    const payoutRequestBody = {
      sender_batch_header: {
        recipient_type: 'EMAIL',
        email_message: 'Payment from Ego',
        note: 'Enjoy your payment',
      },
      items: [
        {
          recipient_type: 'EMAIL',
          amount: {
            value: acttuallMoney.toString(),
            currency: 'USD',
          },
          receiver: user.email,
          note: 'Thank you for your service',
        },
      ],

    }
    try {
      // Make a POST request to PayPal's payouts.create API to initiate the payout
      const response = await axios.post(
        'https://api.sandbox.paypal.com/v1/payments/payouts',
        payoutRequestBody,
        config
      );
      if (response.status == 201) {
        const payout = new Payout();
        payout.amount = acttuallMoney;
        payout.freeLanceId = freeLance.id;
        payout.date = new Date();
        user.walletBalance -= amount;
        user.point -= point;
        await user.save();

        await this.payoutModele.create(payout.dataValues);
        return `you recive of ${acttuallMoney} USD from${'my app'} completed successfully. Payout ID: ${response.data.batch_header.payout_batch_id}`;
      }

    } catch (error) {
      console.error('PayPal payout error:', error.response?.data || error.message);
      throw new Error('Failed to process the payout.');
    }

  }

  async success(req: Request) {
    if (!DataForBayment.userId || !DataForBayment.amount) {
      return;
    }
    const user = await this.UserModel.findOne({ where: { id: DataForBayment.userId } });
    user.walletBalance += DataForBayment.amount;
    await user.save();

    const payment = new Payment();
    payment.amount = DataForBayment.amount;
    payment.userId = DataForBayment.userId;
    payment.date = new Date();
    await payment.save();
    return payment;
  }

async  showPackgs(){
  return await this.packgsModele.findAll();
}

}
