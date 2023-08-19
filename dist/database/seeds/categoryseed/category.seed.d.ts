import { Category } from '../../models/category.model';
export declare class CategorySeed {
    private readonly categoryModel;
    constructor(categoryModel: typeof Category);
    seedCategories(): Promise<void>;
}
