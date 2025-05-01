import { inject, Injectable, EventEmitter } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';
import { User } from '@supabase/supabase-js';
import { UtilsService } from './utils.service';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sb = inject(SupabaseService);
  utilsSvc = inject(UtilsService);
  router = inject(Router);

  usuarioActual:User | null = null;
  tablaUsuarios;

  alCerrarSesion: EventEmitter<void> = new EventEmitter<void>();

  constructor() { 
    this.sb.supabase.auth.onAuthStateChange((event, session) =>{
      console.log(event, session);

      if(session === null){
        this.usuarioActual = null;
        //this.utilsSvc.navegar('/login');
        //this.router.navigateByUrl('/login');
      }else{
        this.usuarioActual = session.user;
        //this.router.navigateByUrl('/');
        //this.utilsSvc.navegar('/');
      }
    });

    this.tablaUsuarios = this.sb.supabase.from("usuarios");
  }

  async iniciarSesion(correo: string, contraseña: string) {
    const { data, error } = await this.sb.supabase.auth.signInWithPassword({
      email: correo,
      password: contraseña
    });
  
    if (error) {
      throw error;
    }
  
    return data;
  }
  

  async crearCuenta(correo: string, contraseña: string, nombre: string, apellido: string, edad: number) {
    const { data, error } = await this.sb.supabase.auth.signUp({
       email: correo,
       password: contraseña
     });

     if (error) {
      throw error;
    }
  
    return data;
  }

  async generarUsuario(usuario: Usuario){
    const {data, error, count, status, statusText} = await this.tablaUsuarios.insert(usuario);
    console.log(data, error, count, status, statusText);
  }

  async cerrarSesion(){
    const { error } = await this.sb.supabase.auth.signOut();
    this.alCerrarSesion.emit();
  }
}
