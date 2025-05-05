import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  supabase: SupabaseClient<any, "public", any>;
  usuario: null | any = {};

  constructor() { 
    this.supabase = createClient(
      "https://rkbqoxoodmpgkbvnaitz.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrYnFveG9vZG1wZ2tidm5haXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NTU1NDcsImV4cCI6MjA2MDUzMTU0N30.hF-2KoXyWQhilKGe-Rtl4tvpB_1jrHrYktOXIh8EVDk"
    );
  }

  async traerMensajes() {
    const { data, error } = await this.supabase.from("mensajes").select("id, mensaje, created_at, usuarios (id, nombre, email)");
    //console.log(data, error);

    if (error) {
      console.log('Error al traer mensajes:', error);
      return [];
    }
  
    return data ?? [];
    //return data as any[];
  }

  async generarUsuario(correo: string, nombre: string, apellido: string, edad: number) {
    const { data: usuarioExistente } = await this.supabase.from("usuarios").select("id").eq("email", correo).maybeSingle();

    if (usuarioExistente) {
      throw new Error("Ya existe un usuario con este correo.");
    }

    const {data, error} = await this.supabase.from("usuarios").insert({
      email: correo,
      nombre: nombre,
      apellido: apellido,
      edad: edad
    });
    if (error) {
      throw error;
    }
    return data;
  }

  async guardarMensaje(mensaje: string, id_usuario: number) {
    const {data} = await this.supabase.from("mensajes").insert({
      mensaje: mensaje, id_usuario: id_usuario
    })
  }
}
