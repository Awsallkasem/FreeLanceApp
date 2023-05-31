import { MiddlewareConsumer } from "@nestjs/common";
import { User } from "../database/models/user.model";
export declare const UserProviders: {
    provide: string;
    useValue: typeof User;
}[];
export declare class UserModule {
    configure(consumer: MiddlewareConsumer): void;
}
