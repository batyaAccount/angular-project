import { CanActivateFn } from '@angular/router';

export const letGuard: CanActivateFn = (route, state) => {
  return true;
};
