import { Module } from '@nestjs/common';
import { DeepseekService } from './deepseek.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [DeepseekService],
  exports: [DeepseekService],
})
export class DeepseekModule {}