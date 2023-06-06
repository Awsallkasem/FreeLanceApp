import { Body, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { AuthService } from "src/app/auth/auth.service";
import { User, UserRole } from "src/database/models/user.model";

@Injectable()
export class FreeLanceMiddleware implements NestMiddleware {
  constructor() { }

  async use(req, res, next: NextFunction) {
    if(req.body.user.role==UserRole.ADMIN){
      next();
    }
    if (req.body.user.role != UserRole.FreeLnce || req.body.user.isBlocked||!req.body.user.isActive ) {
      return res.status(403).json({ message: 'access denied' });
    }
    next();



  }
}