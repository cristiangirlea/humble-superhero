import { Test, TestingModule } from '@nestjs/testing';
import { BullModule } from '@nestjs/bull';
import { BullMQService } from '../bullmq.service';
import { PrismaModule } from '../../../prisma/prisma.module';

describe('BullMQService', () => {
    let service: BullMQService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                BullModule.registerQueue({
                    name: 'superhero-queue',
                }),
                PrismaModule,
            ],
            providers: [BullMQService],
        }).compile();

        service = module.get<BullMQService>(BullMQService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});