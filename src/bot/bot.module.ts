import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { sessionMiddleware } from 'src/middleware/session.middelware';
import { loggingMiddleware } from 'src/middleware/middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        middlewares: [sessionMiddleware, loggingMiddleware],
        token: configService.get<string>('TG_BOT_API_KEY') || process.env.TG_BOT_API_KEY,
        // launchOptions: {
        //   webhook: {
        //     domain: 'your-domain.com',
        //     hookPath: '/secret-path',
        //   },
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [BotUpdate],
})
export class BotModule {}
