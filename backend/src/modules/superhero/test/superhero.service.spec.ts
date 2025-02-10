import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from '../superhero.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { prismaMock } from '../../../prisma/prisma.mock'; // ✅ Import the mock
import { BullMQModule } from '../../bullmq/bullmq.module';

describe('SuperheroService', () => {
    let service: SuperheroService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [BullMQModule],
            providers: [
                SuperheroService,
                {
                    provide: PrismaService,
                    useValue: prismaMock,
                },
            ],
        }).compile();

        service = module.get<SuperheroService>(SuperheroService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get superheroes with pagination', async () => {
        const currentDate = new Date();
        const mockHeroes = [
            {
                id: 1,
                name: 'Hero1',
                superpower: 'Power1',
                humilityScore: 8,
                status: 'Pending',
                createdAt: currentDate,
                updatedAt: currentDate,
            },
        ];

        (prismaMock.superhero.findMany as jest.Mock).mockResolvedValue(mockHeroes);
        (prismaMock.superhero.count as jest.Mock).mockResolvedValue(1);

        const result = await service.getSuperheroes(1, 10);

        expect(result).toBeDefined();
        expect(result.data).toEqual(mockHeroes);
        expect(result.meta.total).toBe(1);
    });

    it('should return an empty list when there are no superheroes', async () => {
        jest.spyOn(prismaMock.superhero, 'findMany').mockResolvedValue([]);
        jest.spyOn(prismaMock.superhero, 'count').mockResolvedValue(0);

        const result = await service.getSuperheroes(1, 10);
        expect(result.data).toEqual([]);
        expect(result.meta.total).toBe(0);
    });

    afterAll(async () => {
        await prismaMock.$disconnect();
        jest.clearAllMocks();
    });
});