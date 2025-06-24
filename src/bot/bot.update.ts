import { Inject, Injectable } from '@nestjs/common';
import {
  Command,
  Ctx,
  Help,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { GigachatService } from 'src/gigachat/gigachat.service';
import { Context, Telegraf } from 'telegraf';

@Update()
@Injectable()
export class BotUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    @Inject(GigachatService)
    private readonly ai: GigachatService,
  ) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    await ctx.reply(
      'Привет! Я бот на dd.news! Через меня можно получить информацию или открыть приложение',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Запустить приложение',
                web_app: { url: 'https://mini-app-dd-news.vercel.app/' },
              },
            ],
          ],
        },
      },
    );
  }

  @Help()
  async onHelp(@Ctx() ctx: Context) {
    await ctx.reply(
      'Доступные команды:\n/start - Начать работу\n/order - заказать\n/help - Помощь\n/site - наш сайт\n/open_app - приложене\n\nEmail: test@mail.ru\n\nЕще я могу дать ответ на вопросы, попробуй написать мне сообщение',
    );
  }

  @Command('site')
  async siteCommand(@Ctx() ctx: Context) {
    await ctx.reply('Читайте новости на нашем сайте: https://dd.news/');
  }

  @Command('open_app')
  async openAppCommand(@Ctx() ctx: Context) {
    await ctx.reply('Вот кнопка для открытия', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Запустить приложение',
              web_app: { url: 'https://mini-app-dd-news.vercel.app/' },
            },
          ],
        ],
      },
    });
  }

  @Command('order')
  async orderCommand(@Ctx() ctx: Context) {
    await ctx.reply('Заказать услуги следующие:', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Запустить приложение',
              web_app: { url: 'https://mini-app-dd-news.vercel.app/' },
            },
          ],
          [
            {
              text: 'Открыть сайт',
              url: 'https://mini-app-dd-news.vercel.app/',
            },
          ],
          [
            {
              text: 'Запустить приложение',
              web_app: { url: 'https://mini-app-dd-news.vercel.app/' },
            },
          ],
          [
            {
              text: 'callback_data',
              callback_data: '{"a": 11, "b": 2, "c": 3}',
            },
            {
              text: 'Открыть сайт',
              url: 'https://mini-app-dd-news.vercel.app/',
            },
            {
              text: 'Открыть сайт',
              url: 'https://mini-app-dd-news.vercel.app/',
            },
          ],
        ],
      },
    });
  }

  @On('sticker')
  async onSticker(@Ctx() ctx: Context) {
    await ctx.reply('Классный стикер! 😊');
  }

  @On('text')
  async onMessage(@Message('text') text: string, @Ctx() ctx: Context) {
    try {
      const data = await this.ai.sendMessage(text);
      console.log(JSON.stringify(data));
      await ctx.reply(data.map((item) => item.message.content).join('. '));
    } catch (error) {
      console.error('Error fetching data:', error);
      await ctx.reply(`Ошибка: "${JSON.stringify(error)}"`);
    }
  }
}
