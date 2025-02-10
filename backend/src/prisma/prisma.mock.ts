import { PrismaClient } from '@prisma/client';
import { jest } from '@jest/globals';

export const prismaMock = {
    superhero: {
        create: jest.fn() as jest.Mock,
        findMany: jest.fn() as jest.Mock,
        update: jest.fn() as jest.Mock,
        deleteMany: jest.fn() as jest.Mock,
        count: jest.fn() as jest.Mock,
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
} as unknown as PrismaClient;
