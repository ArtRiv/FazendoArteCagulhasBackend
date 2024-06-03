import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';

@Module({
  imports: [PrismaModule],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
