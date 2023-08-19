// src/commands/seed-categories.command.ts
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CategorySeed } from './category.seed';

@Injectable()
export class SeedCategoriesCommand {
  constructor(private readonly categorySeed: CategorySeed) {}

  @Command({
    command: 'seed:categories',
    describe: 'Seed categories into the Category table',
  })
  async run() {
    await this.categorySeed.seedCategories();
    console.log('Categories seeded successfully.');
  }
}
