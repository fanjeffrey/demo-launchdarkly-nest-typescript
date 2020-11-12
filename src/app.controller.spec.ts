import { Test, TestingModule } from '@nestjs/testing';
import * as LaunchDarkly from 'launchdarkly-node-server-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureTogglesService } from './feature-toggles.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: FeatureTogglesService,
          useFactory: async () => {
            const ldClient = LaunchDarkly.init('sdk-key-is-a-guid');
            await ldClient.waitForInitialization();

            return new FeatureTogglesService(ldClient);
          },
        },
      ],
    })
    .compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello())
        .toBe('Hello World!');
    });
  });
});
