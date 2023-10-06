import { IUser } from '@store-apis/domains/auth';

export function GCPLogging(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const request = args[0] as Request;
    const user = args[0].user as IUser;
    console.log(
      `Incoming request: ${request.method} ${request.url} ${
        user && `| User: ${user?.uid}`
      }`
    );

    console.time(propertyKey);
    const result = originalMethod.apply(this, args);
    console.timeEnd(propertyKey);

    return result;
  };

  return descriptor;
}
