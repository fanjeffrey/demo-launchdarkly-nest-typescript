import { Injectable } from '@nestjs/common';
import { LDClient, LDUser } from 'launchdarkly-node-server-sdk';

@Injectable()
export class FeatureTogglesService {
  public constructor(
    private readonly ldClient: LDClient
  ) {}

  public async checkToggle(
    toggleName: string,
    user: LDUser,
    defaultValue: boolean,
  ): Promise<boolean> {
    const enabled = await this.ldClient.variation(
      toggleName,
      user,
      defaultValue,
    );

    // Console.log( toggleName + (enabled ? 'enabled' : 'disabled') + ' for: ' + user.country, );

    return enabled;
  }

  public async checkToggleEnabled(
    toggleName: string,
    user: LDUser,
  ): Promise<boolean> {
    return this.checkToggle(toggleName, user, false);
  }
}
