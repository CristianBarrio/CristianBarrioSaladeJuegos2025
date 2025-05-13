import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const estaLogueadoGuard: CanActivateFn = (route, state) => {
  const auth = inject (AuthService);
  const router = inject (Router);

  if(auth.getUsuarioActual() !== null){
    return true;
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: '¡Debe ingresar primero!',
      position: 'top-right',
      timer: 2000,
      showConfirmButton: false
      
    });
    router.navigateByUrl("login");
    return false;
  }
};
