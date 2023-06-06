import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from 'src/app/auth/auth.service';
export declare class decodeTokenMiddleware implements NestMiddleware {
    private readonly authService;
    constructor(authService: AuthService);
    use(req: any, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
