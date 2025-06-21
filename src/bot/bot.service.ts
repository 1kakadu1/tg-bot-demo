import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class BotService {
 constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  async sendMessage(chatId: string, message: string) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
