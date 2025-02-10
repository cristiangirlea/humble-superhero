import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateHero, UpdateHero } from './superhero.zod';
import { BullMQService } from '../bullmq/bullmq.service';

@Injectable()
export class SuperheroService {
    constructor(
        private prisma: PrismaService,
        private bullMQService: BullMQService,
    ) {}

    async getSuperheroes(page: number = 1, limit: number = 10) {
        const validPage = Math.max(1, page);
        const validLimit = Math.min(Math.max(1, limit), 100);
        const skip = (validPage - 1) * validLimit;

        const [data, total] = await Promise.all([
            this.prisma.superhero.findMany({
                skip,
                take: validLimit,
                orderBy: { humilityScore: 'desc' },
            }),
            this.prisma.superhero.count(),
        ]);

        return {
            data,
            meta: {
                total,
                page: validPage,
                limit: validLimit,
                totalPages: Math.ceil(total / validLimit),
            },
        };
    }

    async addSuperhero(data: CreateHero) {
        try {
            const hero = await this.prisma.superhero.create({
                data,
                select: {
                    id: true,
                    name: true,
                    superpower: true,
                    humilityScore: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });

            // Add job to the queue
            await this.bullMQService.addJob({ heroId: hero.id });

            return hero;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException(`Superhero with name "${data.name}" already exists`);
                }
            }
            throw error;
        }
    }

    async updateSuperhero(id: number, data: UpdateHero) {
        try {
            const existingHero = await this.prisma.superhero.findUnique({
                where: { id }
            });

            if (!existingHero) {
                throw new NotFoundException(`Superhero with ID ${id} not found`);
            }

            return await this.prisma.superhero.update({
                where: { id },
                data,
                select: {
                    id: true,
                    name: true,
                    superpower: true,
                    humilityScore: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Name already taken by another superhero');
                }
            }
            throw error;
        }
    }
}