import { Module } from '@nestjs/common';
import { GigachatService } from './gigachat.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [GigachatService],
  exports: [GigachatService],
})
export class GigachatModule {}