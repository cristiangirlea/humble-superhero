import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (e) {
      if (e instanceof ZodError) {
        // Map Zod errors to a more readable format
        const errors = e.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        throw new BadRequestException(errors);
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
