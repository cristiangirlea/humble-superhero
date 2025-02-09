import { Module } from '@nestjs/common';
import { SuperheroController } from './modules/superhero/superhero.controller';
import { SuperheroService } from './modules/superhero/superhero.service';
import { PrismaService } from './prisma/prisma.service';
import { BullMQModule } from './modules/bullmq/bullmq.module';

@Module({
    imports: [BullMQModule],
    controllers: [SuperheroController],
    providers: [SuperheroService, PrismaService],
})
export class AppModule {}