import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DeepseekService {
  private readonly apiUrl = 'https://api.deepseek.com/chat/completions';
  private readonly apiKey = process.env.KEY_API_AI;

  constructor(private readonly httpService: HttpService) {}

  async sendMessage(prompt: string): Promise<any> {
    console.log("APIKEY", this.apiKey)
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };

    const data = {
      model: "deepseek-chat",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(this.apiUrl, data, { headers })
      );
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data);
      throw new Error('Failed to get response from DeepSeek API');
    }
  }
}