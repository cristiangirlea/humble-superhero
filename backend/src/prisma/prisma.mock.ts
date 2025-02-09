import { PrismaClient, Prisma } from '@prisma/client';
import { jest } from '@jest/globals';

// ✅ Create a mock object with all Prisma functions
export const prismaMock = {
    superhero: {
        create: jest.fn() as jest.Mock,
        findMany: jest.fn() as jest.Mock,
        update: jest.fn() as jest.Mock,
        deleteMany: jest.fn() as jest.Mock,
    },
} as unknown as PrismaClient;