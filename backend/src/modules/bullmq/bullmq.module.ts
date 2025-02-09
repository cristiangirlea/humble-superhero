import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BullMQService } from './bullmq.service';
import { BullMQProcessor } from './bullmq.processor';

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: 'redis',
                port: 6379,
            },
        }),
        BullModule.registerQueue({
            name: 'superhero-queue',
        }),
    ],
    providers: [BullMQService, BullMQProcessor],
    exports: [BullMQService],
})
export class BullMQModule {}