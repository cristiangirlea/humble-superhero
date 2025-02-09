import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('SuperheroController (e2e)', () => {
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
        // Clean the database before each test
        await prismaService.superhero.deleteMany();
    });

    it('/superhero (GET)', () => {
        return request(app.getHttpServer())
            .get('/superhero')
            .expect(200)
            .expect([]);
    });

    it('/superhero (POST)', () => {
        return request(app.getHttpServer())
            .post('/superhero')
            .send({
                name: 'Superman',
                power: 100,
            })
            .expect(201);
    });

    afterAll(async () => {
        await app.close();
    });
});