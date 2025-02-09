import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroController } from '../superhero.controller';
import { SuperheroService } from '../superhero.service';
import { ZodValidationPipe } from '../../common/zod-validation.pipe';
import { CreateHeroSchema } from '../superhero.zod';
import { BadRequestException } from '@nestjs/common';

describe('SuperheroController', () => {
    let controller: SuperheroController;
    let service: SuperheroService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SuperheroController],
            providers: [
                {
                    provide: SuperheroService,
                    useValue: {
                        getSuperheroes: jest.fn(),
                        addSuperhero: jest.fn(),
                        updateSuperhero: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<SuperheroController>(SuperheroController);
        service = module.get<SuperheroService>(SuperheroService);
    });

    it('should get superheroes', async () => {
        const mockHeroes = {
            data: [
                {
                    id: 1,
                    name: 'Hero1',
                    superpower: 'Power1',
                    humilityScore: 8,
                    status: 'Pending',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            ],
            meta: {
                total: 1,
                page: 1,
                limit: 10,
                totalPages: 1
            }
        };

        jest.spyOn(service, 'getSuperheroes').mockResolvedValue(mockHeroes);
        expect(await controller.getSuperheroes(1, 10)).toBe(mockHeroes);
    });

    it('should return 400 when adding a superhero with invalid data', async () => {
        const invalidHero = { name: '', superpower: '', humilityScore: 11 };
        const validationPipe = new ZodValidationPipe(CreateHeroSchema);

        try {
            validationPipe.transform(invalidHero, { type: 'body' });
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    });
});