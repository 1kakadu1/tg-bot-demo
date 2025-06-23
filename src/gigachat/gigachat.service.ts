import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import GigaChat from 'gigachat';
import { Agent } from 'node:https';
import { Choices } from 'gigachat/interfaces';


@Injectable()
export class GigachatService {
  private client: GigaChat;
  constructor(private readonly httpService: HttpService) {
    const httpsAgent = new Agent({
      rejectUnauthorized: false, 
     });
      this.client = new GigaChat({
      timeout: 600,
      model: 'GigaChat',
      credentials: process.env.KEY_API_AI,
      httpsAgent: httpsAgent,
    });
  }

  async sendMessage(prompt: string): Promise<Choices[]> {
    try {
      const data =  await this.client.chat(prompt);
      return data.choices;
    } catch (error) {
      console.error('API Error:', error.response?.data);
      throw new Error('Failed to get response from GigaChat API');
    }
  }
}