export declare class OneSignalService {
    private readonly apiKey;
    private readonly appId;
    constructor();
    sendNotificationToUser(userId: string, message: any): Promise<void>;
}
