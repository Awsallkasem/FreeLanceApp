import { Body, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { AuthService } from "src/services/auth.service";
import { User, UserRole } from "src/database/models/user.model";

@Injectable()
export class AdminMiddleware implements NestMiddleware {
    constructor() { }

 async use(req, res, next: NextFunction) {
  if(req.body.user.role!=UserRole.ADMIN||req.body.user.isBlocked){
    return res.status(403).json({message:'access denied'});  
  }
  next();
  }
}