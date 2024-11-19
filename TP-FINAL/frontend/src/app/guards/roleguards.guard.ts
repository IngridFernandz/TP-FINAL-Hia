import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { LoginService } from '../services/login.service';


export const roleGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const userRole = loginService.getUserRole();
  const allowedRoles = route.data?.['roles'] as Array<string>;

  if (allowedRoles.includes(userRole!)) {
    return true;
  } else {
    router.navigate(['/inicio']);
    console.log("no tienes permisos de usuario")
    return false;
  }
};
