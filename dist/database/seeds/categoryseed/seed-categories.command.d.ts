import { CategorySeed } from './category.seed';
export declare class SeedCategoriesCommand {
    private readonly categorySeed;
    constructor(categorySeed: CategorySeed);
    run(): Promise<void>;
}
