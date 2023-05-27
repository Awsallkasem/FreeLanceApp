import { NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
export declare class FreeLanceMiddleware implements NestMiddleware {
    constructor();
    use(req: any, res: any, next: NextFunction): Promise<any>;
}
