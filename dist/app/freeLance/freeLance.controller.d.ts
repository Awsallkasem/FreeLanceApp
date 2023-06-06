import { Service } from 'src/database/models/service.model';
import { FreeLanceService } from 'src/app/freeLance/freeLance.service';
export declare class FreeLanceController {
    private readonly freeLanceService;
    constructor(freeLanceService: FreeLanceService);
    addService(id: string, service: Service, req: any, res: any): Promise<any>;
}
