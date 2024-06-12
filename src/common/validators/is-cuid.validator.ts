import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import cuid from 'cuid';

export function IsCuid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCuid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false; // Value is not a string
          }
          return cuid.isCuid(value); // Check if value is a valid CUID
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid CUID`; // Default error message
        },
      },
    });
  };
}
