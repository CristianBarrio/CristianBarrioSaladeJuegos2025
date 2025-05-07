import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const estaLogueadoGuard: CanActivateFn = (route, state) => {
  const auth = inject (AuthService);
  const router = inject (Router);

  if(auth.getUsuarioActual() !== null){
    return true;
  }else{
    router.navigateByUrl("login");
    return false;
  }
};
