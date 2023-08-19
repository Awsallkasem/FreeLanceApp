// onesignal.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OneSignalService {
  private readonly apiKey: string;
  private readonly appId: string;

  constructor() {
    this.apiKey = 'ZDBiOGU4YTQtZDJhMS00N2IwLThmMzAtODdiODY5ZGZmNjAw';
    this.appId = '75ddde4b-596e-49da-9678-2772b7f54196';
  }

  async sendNotificationToUser(userId: string, message: any) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${this.apiKey}`,
    };

    const data = {
      app_id: this.appId,
      include_player_ids: [userId],
      contents: { en: message },
    };

    try {
      await axios.post('https://onesignal.com/api/v1/notifications', data, { headers });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}
