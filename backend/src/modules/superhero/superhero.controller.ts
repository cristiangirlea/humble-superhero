import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    Query,
    HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SuperheroService } from './superhero.service';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { CreateHeroSchema, UpdateHeroSchema } from './superhero.zod';
import { z } from "zod";

@ApiTags('superheroes')
@Controller('superheroes')
export class SuperheroController {
    constructor(private readonly superheroService: SuperheroService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new superhero' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The superhero has been successfully created.'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid superhero data.'
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'Superhero with this name already exists.'
    })
    async addSuperhero(
        @Body(new ZodValidationPipe(CreateHeroSchema))
        superhero: z.infer<typeof CreateHeroSchema>,
    ) {
        const newHero = await this.superheroService.addSuperhero(superhero);
        return {
            message: 'Superhero added successfully!',
            superhero: newHero
        };
    }

    @Get()
    @ApiOperation({ summary: 'Get all superheroes' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of superheroes retrieved successfully.'
    })
    async getSuperheroes(
        @Query('page', new ParseIntPipe({ optional: true })) page?: number,
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    ) {
        return this.superheroService.getSuperheroes(page, limit);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a superhero' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The superhero has been successfully updated.'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Superhero not found.'
    })
    async updateSuperhero(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ZodValidationPipe(UpdateHeroSchema))
        heroUpdates: z.infer<typeof UpdateHeroSchema>,
    ) {
        const updatedHero = await this.superheroService.updateSuperhero(id, heroUpdates);
        return {
            message: 'Superhero updated successfully!',
            superhero: updatedHero
        };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a superhero' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The superhero has been successfully deleted.'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Superhero not found.'
    })
    async deleteSuperhero(
        @Param('id', ParseIntPipe) id: number,
    ) {
        await this.superheroService.deleteSuperhero(id);
        return {
            message: 'Superhero deleted successfully!'
        };
    }
}