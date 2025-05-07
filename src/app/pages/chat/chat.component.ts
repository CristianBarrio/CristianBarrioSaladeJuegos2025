import { Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  supabaseService = inject(SupabaseService);
  auth = inject(AuthService);
  
  mensajes = signal<any>([]);
  mensaje = "";

  constructor() {
    this.supabaseService.traerMensajes().then((data) => {
      this.mensajes.set([...data]);
    });
  }
  
    ngOnInit(){
      const canal = this.supabaseService.supabase.channel("table-db-changes");
      canal.on(
        'postgres_changes',{
          event: 'INSERT',
          schema: 'public',
          table: 'mensajes'
        },
        async (cambios:any) => {
          console.log(cambios);
          const {data} = await this.supabaseService.supabase.from("usuarios").select("nombre").eq("id", cambios.new["id_usuario"]);
          cambios.new.usuarios = {nombre: data![0].nombre}

          this.mensajes.update((valor_anterior) => {
            valor_anterior.push(cambios.new);
            return valor_anterior;
          })
        }
      );
      canal.subscribe();
    }

   enviar(){
    const idUsuario = this.auth.getUsuarioActual()?.id;
    this.supabaseService.guardarMensaje(this.mensaje, idUsuario);

    this.mensaje = "";
  }

}