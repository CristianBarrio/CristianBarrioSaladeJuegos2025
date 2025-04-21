import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sb = inject(SupabaseService);
  router = inject(Router);

  usuarioActual:User | null = null;

  constructor() { 
    this.sb.supabase.auth.onAuthStateChange((event, session) =>{
      console.log(event, session);

      if(session === null){
        this.usuarioActual = null;
        this.router.navigateByUrl("/login");
      }else{
        this.usuarioActual = session.user;
        this.router.navigateByUrl("/");
      }
    });
  }

  async iniciarSesion(correo:string, contraseña:string){
    const { data, error } = await this.sb.supabase.auth.signInWithPassword({
      email: correo,
      password: contraseña
    });
  }

  async crearCuenta(correo: string, contraseña: string){
    const { data, error } = await this.sb.supabase.auth.signUp({
       email: correo,
       password: contraseña 
     });
  }

  async cerrarSesion(){
    const { error } = await this.sb.supabase.auth.signOut();
  }
}
