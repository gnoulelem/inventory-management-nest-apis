import { SetMetadata } from '@nestjs/common';
import { EPermission } from '../enum/permission.enum';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: EPermission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
