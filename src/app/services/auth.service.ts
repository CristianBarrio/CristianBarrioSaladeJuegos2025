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

  //usuarioActual:User | null = null;
  usuarioActual: Usuario | null = null;

  //alCerrarSesion: EventEmitter<void> = new EventEmitter<void>();

  constructor() { 
    this.sb.supabase.auth.onAuthStateChange((event, session) =>{
      //console.log("Event: "+event, "session: "+session);

      this.manejarCambioDeSesion(session);
      
      // if(session === null){
      //   this.usuarioActual = null;
      // }else{
      //   //this.usuarioActual = session.user;
      // }
    });

    //this.tablaUsuarios = this.sb.supabase.from("usuarios");
  }

  async iniciarSesion(correo: string, contraseña: string) {
    const { data, error } = await this.sb.supabase.auth.signInWithPassword({
      email: correo,
      password: contraseña
    });
  
      if (error) {
        throw error;
      }

    const { data: infoUsuario, error: errorUsuario } = await this.sb.supabase.from("usuarios").select('*').eq('email', correo).single();

    if (errorUsuario) {
      throw errorUsuario;
    }

    this.usuarioActual = infoUsuario;

    return data;
  }

  async manejarCambioDeSesion(session: any) {
    if (session === null) {
      this.usuarioActual = null;
    } else {
      const correo = session.user.email;
      const { data: infoUsuario, error } = await this.sb.supabase.from("usuarios").select('*').eq('email', correo).single();
  
      if (!error) {
        this.usuarioActual = infoUsuario;
      } else {
        console.log('Error al obtener usuario: ', error);
      }
    }
  }
  
  // async recuperarUsuarioActual() {
  //   const {
  //     data: { session },
  //   } = await this.sb.supabase.auth.getSession(); 
  
  //   if (session) {
  //     const correo = session.user.email;
  //     const { data: usuario, error } = await this.sb.supabase
  //       .from("usuarios")
  //       .select("*")
  //       .eq("email", correo)
  //       .single();
  
  //     if (!error) {
  //       this.usuarioActual = usuario;
  //     }
  //   }
  // }
  
  async recuperarUsuarioActual(): Promise<Usuario | null> {
    const {
      data: { session },
    } = await this.sb.supabase.auth.getSession();
  
    if (session) {
      const correo = session.user.email;
      const { data: usuario, error } = await this.sb.supabase
        .from("usuarios")
        .select("*")
        .eq("email", correo)
        .single();
  
      if (!error) {
        this.usuarioActual = usuario;
        return usuario;
      }
    }
  
    this.usuarioActual = null;
    return null;
  }
  

  async crearCuenta(correo: string, contraseña: string, nombre: string, apellido: string, edad: number) {
    const { data, error } = await this.sb.supabase.auth.signUp({
       email: correo,
       password: contraseña
     });

     if (error) {
      throw error;
    }

    //await this.sb.generarUsuario(correo, nombre, apellido, edad); 

    return await this.sb.generarUsuario(correo, nombre, apellido, edad); 
    // return data;
  }

  async cerrarSesion(){
    const { error } = await this.sb.supabase.auth.signOut();
    //this.alCerrarSesion.emit();
  }
}
