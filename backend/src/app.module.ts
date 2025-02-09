import { Module } from '@nestjs/common';
import { SuperheroController } from './modules/superhero/superhero.controller';
import { SuperheroService } from './modules/superhero/superhero.service';
import { BullMQModule } from './modules/bullmq/bullmq.module';
import {PrismaModule} from "./prisma/prisma.module";

@Module({
    imports: [
        PrismaModule,
        BullMQModule
    ],
    controllers: [SuperheroController],
    providers: [SuperheroService],
})
export class AppModule {}