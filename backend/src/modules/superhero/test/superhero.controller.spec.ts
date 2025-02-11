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
                        deleteSuperhero: jest.fn(),
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

    it('should add a superhero', async () => {
        const newHero = {
            id: 2,
            name: 'Hero2',
            superpower: 'Power2',
            humilityScore: 7,
            status: 'Active',
            createdAt: new Date('2025-02-11T15:56:55.719Z'),
            updatedAt: new Date('2025-02-11T15:56:55.719Z'),
        };

        jest.spyOn(service, 'addSuperhero').mockResolvedValue(newHero);
        const result = await controller.addSuperhero(newHero);
        expect(result).toEqual({
            message: 'Superhero added successfully!',
            superhero: newHero,
        });
    });

    it('should update a superhero', async () => {
        const updatedHero = {
            id: 1,
            name: 'UpdatedHero',
            superpower: 'UpdatedPower',
            humilityScore: 9,
            status: 'Active',
            createdAt: new Date('2025-02-11T15:56:55.731Z'),
            updatedAt: new Date('2025-02-11T15:56:55.731Z'),
        };

        jest.spyOn(service, 'updateSuperhero').mockResolvedValue(updatedHero);
        const result = await controller.updateSuperhero(1, updatedHero);
        expect(result).toEqual({
            message: 'Superhero updated successfully!',
            superhero: updatedHero,
        });
    });

    it('should delete a superhero', async () => {
        const result = { message: 'Superhero deleted successfully!' };

        jest.spyOn(service, 'deleteSuperhero').mockResolvedValue(result);
        expect(await controller.deleteSuperhero(1)).toStrictEqual(result);
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