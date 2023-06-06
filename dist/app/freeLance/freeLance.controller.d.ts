import { Service } from 'src/database/models/service.model';
import { FreeLanceService } from 'src/app/freeLance/freeLance.service';
export declare class FreeLanceController {
    private readonly freeLanceService;
    constructor(freeLanceService: FreeLanceService);
    getAllPost(res: any): Promise<any>;
    getAllPostByCategory(category: string, res: any): Promise<any>;
    addService(id: string, service: Service, req: any, res: any): Promise<any>;
    checkMyService(req: any, res: any): Promise<any>;
}
