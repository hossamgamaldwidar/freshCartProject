import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const canActiveGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId) && sessionStorage.getItem('token')) {
    return true;
  } else {
    _Router.navigate(['/login']);
    return false;
  }
};