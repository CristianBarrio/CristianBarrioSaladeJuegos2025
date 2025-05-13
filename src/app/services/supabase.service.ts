import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  supabase: SupabaseClient<any, "public", any>;
  usuario: null | any = {};

  juegos: { [juego: string]: string[] } = {
  Ahorcado: ['aciertos', 'tiempoCero', 'errores'],
  MayorMenor: ['aciertos', 'errores'],
  Preguntados: ['aciertos', 'tiempoCero', 'errores'],
  Blackjack: ['victorias', 'empates', 'derrotas']
  };

  constructor() { 
    this.supabase = createClient(
      "https://rkbqoxoodmpgkbvnaitz.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrYnFveG9vZG1wZ2tidm5haXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NTU1NDcsImV4cCI6MjA2MDUzMTU0N30.hF-2KoXyWQhilKGe-Rtl4tvpB_1jrHrYktOXIh8EVDk"
    );
  }

  async traerMensajes() {
    const { data, error } = await this.supabase.from("mensajes").select("id, mensaje, created_at, usuarios (id, nombre, email)");

    if (error) {
      console.log('Error al traer mensajes:', error);
      return [];
    }
  
    return data as any[];
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

  async guardarMensaje(mensaje: string, id_usuario: any) {
    const {data} = await this.supabase.from("mensajes").insert({
      mensaje: mensaje, id_usuario: id_usuario
    })
  }
  
  async traerResultados(juego:string){
    let datos = this.juegos[juego];

    const { data, error } = await this.supabase.from(`resultados${juego}`).select(`id, ${datos}, usuarios (id, nombre, email)`);

    if(error){
      console.log("Error al traer resultados: ", error);
    }

    return data as any[];
  }

  async guardarResultado(juego:string, id_usuario:number | undefined, campo:string, incremento:number){
    const { data: fila, error } = await this.supabase.from(`resultados${juego}`).select('id_usuario, '+ campo).eq('id_usuario', id_usuario).maybeSingle();

    if (fila) {
      const filaExiste = fila as Record<string, any>;
      const valorActual = filaExiste[campo] ?? 0;

      const { error: actualizacionError } = await this.supabase.from(`resultados${juego}`).update({ [campo]: valorActual + incremento }).eq('id_usuario', id_usuario);

      if (actualizacionError) {
        console.error("Error al actualizar resultado:", actualizacionError);
      }

    } else {
      const insertData: any = { id_usuario };
      this.juegos[juego].forEach(j => insertData[j] = (j === campo ? incremento : 0));

      const { error: insertError } = await this.supabase.from(`resultados${juego}`).insert(insertData);

      if (insertError) {
        console.error("Error al insertar nuevo resultado:", insertError);
      }
    }
  }

}