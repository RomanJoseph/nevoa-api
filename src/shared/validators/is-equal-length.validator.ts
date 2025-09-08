import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsEqualLength(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEqualLength',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints as string[];
          const relatedValue = (args.object as Record<string, any>)[relatedPropertyName] as string;
          if (relatedValue === undefined || value === undefined) {
            return true;
          }
          return value.split(',').length === relatedValue.split(',').length;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints as string[];
          return `$property must have the same number of comma-separated values as ${relatedPropertyName}`;
        },
      },
    });
  };
}