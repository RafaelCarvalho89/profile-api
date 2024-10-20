import { AnyZodObject, ZodError } from 'zod';
import { InvalidRequirementsError } from '../error/services/InvalidRequirementsError.service';

export interface ValidatorInterface {
  validate(data: Record<string, any>): Promise<void>;
}

export class Validator implements ValidatorInterface {
  constructor(private readonly schema: AnyZodObject) {}

  async validate(data: Record<string, any>): Promise<void> {
    try {
      await this.schema.parseAsync(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0];
        const field = firstError.path.join('.');
        const message = firstError.message;
        throw new InvalidRequirementsError(field, message);
      } else {
        throw error;
      }
    }
  }
}
