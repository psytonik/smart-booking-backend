import { ConfigService } from '@nestjs/config';

export const testConfig = async (configService: ConfigService) => {
  console.log(configService.get('TEST'));
  return {
    testing: configService.get('TEST'),
  };
};
