import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureTogglesService } from './feature-toggles.service';

import * as LaunchDarkly from 'launchdarkly-node-server-sdk';

@Module({
  imports: [],
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
export class AppModule {}
