import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../prisma/prisma.service';

describe('Superhero Integration', () => {
    let app: INestApplication;
    let prismaService: PrismaService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        prismaService = moduleFixture.get<PrismaService>(PrismaService);
        await app.init();
    });

    beforeEach(async () => {
        await prismaService.superhero.deleteMany();
    });

    it('/POST superheroes - should create a new superhero', () => {
        return request(app.getHttpServer())
            .post('/superheroes')
            .send({
                name: 'Test Hero',
                superpower: 'Testing',
                humilityScore: 8
            })
            .expect(201)
            .expect(res => {
                expect(res.body.message).toBe('Superhero added successfully!');
                expect(res.body.superhero.name).toBe('Test Hero');
            });
    });

    it('/POST superheroes - should validate humility score', () => {
        return request(app.getHttpServer())
            .post('/superheroes')
            .send({
                name: 'Test Hero',
                superpower: 'Testing',
                humilityScore: 11 // Invalid score
            })
            .expect(400);
    });

    afterAll(async () => {
        await prismaService.$disconnect();
        await app.close();
    });
});