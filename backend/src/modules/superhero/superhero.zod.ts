// superhero.zod.ts
import { z } from 'zod';

// Base schema for common validations
const BaseHeroSchema = {
    name: z.string()
        .min(1, 'Name is required')
        .max(100, 'Name must be 100 characters or less')
        .trim()
        .transform(val => val.charAt(0).toUpperCase() + val.slice(1)), // Capitalize first letter

    superpower: z.string()
        .min(1, 'Superpower is required')
        .max(100, 'Superpower must be 100 characters or less')
        .trim(),

    humilityScore: z.number()
        .int('Humility score must be a whole number')
        .min(1, 'Humility score must be at least 1')
        .max(10, 'Humility score must be no more than 10')
        .default(5),

    status: z.string()
        .default('Pending')
        .optional(), // Make status optional for creation and updates
};

// Schema for creating a new hero
export const CreateHeroSchema = z.object(BaseHeroSchema);

// Schema for updating a hero - all fields optional
export const UpdateHeroSchema = CreateHeroSchema.partial();

// Schema for pagination query parameters
export const PaginationSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
});

// Response schema for better type safety
export const HeroResponseSchema = CreateHeroSchema.extend({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Export types
export type CreateHero = z.infer<typeof CreateHeroSchema>;
export type UpdateHero = z.infer<typeof UpdateHeroSchema>;
export type PaginationQuery = z.infer<typeof PaginationSchema>;
export type HeroResponse = z.infer<typeof HeroResponseSchema>;