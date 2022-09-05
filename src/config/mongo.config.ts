import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => ({
  uri: getMongoString(configService),
});

const getMongoString = (configService: ConfigService) =>
  configService.get('DB_ADDRESS');
