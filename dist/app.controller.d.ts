import { Sequelize } from 'sequelize-typescript';
export declare class UserService {
    private readonly sequelize;
    constructor(sequelize: Sequelize);
    getAllUsers(): Promise<any>;
}
