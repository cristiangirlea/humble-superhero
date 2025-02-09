import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from '../superhero.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { BullMQModule } from '../../bullmq/bullmq.module';

describe('SuperheroService', () => {
    let service: SuperheroService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [BullMQModule],
            providers: [SuperheroService, PrismaService],
        }).compile();

        service = module.get<SuperheroService>(SuperheroService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get superheroes with pagination', async () => {
        const mockHeroes = [
            {
                id: 1,
                name: 'Hero1',
                superpower: 'Power1',
                humilityScore: 8,
                status: 'Pending',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ];

        jest.spyOn(prismaService.superhero, 'findMany').mockResolvedValue(mockHeroes);
        jest.spyOn(prismaService.superhero, 'count').mockResolvedValue(1);

        const result = await service.getSuperheroes(1, 10);
        console.log(result);
        expect(result.data).toEqual(mockHeroes);
        expect(result.meta.total).toBe(1);
    });

    it('should return an empty list when there are no superheroes', async () => {
        jest.spyOn(prismaService.superhero, 'findMany').mockResolvedValue([]);
        jest.spyOn(prismaService.superhero, 'count').mockResolvedValue(0);

        const result = await service.getSuperheroes(1, 10);
        expect(result.data).toEqual([]);
        expect(result.meta.total).toBe(0);
    });
});