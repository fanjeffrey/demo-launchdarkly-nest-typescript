import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { FeatureTogglesService } from './feature-toggles.service';

@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
    private readonly featureTogglesService: FeatureTogglesService,
  ) {}

  @Get('/categories')
  public async getCategories(
    @Headers('app-region') appRegion: string,
  ): Promise<string[]> {
    const categories = ['CategoryA', 'CategoryB', 'CategoryC', 'CategoryD'];

    const user = {
      country: appRegion,
      key: 'UNIQUE IDENTIFIER',
    };

    const enabled = await this.featureTogglesService.checkToggleEnabled(
      'CategoryD',
      user,
    );

    if (!enabled) {
      // Filter out "CategoryD" from categories
      categories.splice(categories.indexOf('CategoryD'), 1);

      return categories;
    }

    return categories;
  }

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }
}
